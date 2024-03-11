import useSWR, { mutate } from "swr";
import { Question, QuestionType } from "@@/types";
import api from "@/services/api";
import { createStore, StoreApi } from "zustand";
import { createContext, ReactNode, useContext } from "react";

type QuestionState = {
    questions: Question[];
    isLoading: boolean;
    error: string | null;
    createQuestion: (
        type: QuestionType,
        prompt: string,
        sectionId: number,
        order: number,
        isRequired?: boolean,
    ) => Promise<Question>;
    updateQuestion: (
        questionId: number,
        type: QuestionType,
        prompt: string,
        sectionId: number,
        order: number,
        isRequired?: boolean,
    ) => Promise<Question>;
    deleteQuestion: (questionId: number) => Promise<void>;
};

const useQuestionStore = () => {
    const fetcher = async (url: string) => {
        const { data } = await api.get(url);
        return data.data || data;
    };

    const {
        data: questions,
        error,
        mutate: mutateQuestions,
    } = useSWR<Question[]>("/questions", fetcher);

    return createStore<QuestionState>((set) => ({
        questions: questions || [],
        isLoading: !questions && !error,
        error: error ? "Error loading questions" : null,

        createQuestion: async (
            type: QuestionType,
            prompt: string,
            sectionId: number,
            order: number,
            isRequired: boolean = false,
        ) => {
            try {
                const { data } = await api.post("/questions", {
                    type,
                    prompt,
                    section_id: sectionId,
                    order,
                    is_required: isRequired,
                });
                mutateQuestions([...(questions || []), data.data], false);
                return data.data;
            } catch (error) {
                console.error("Error creating question:", error);
                throw error;
            }
        },

        updateQuestion: async (
            questionId: number,
            type: QuestionType,
            prompt: string,
            sectionId: number,
            order: number,
            isRequired: boolean = false,
        ) => {
            try {
                const { data } = await api.put(`/questions/${questionId}`, {
                    type,
                    prompt,
                    section_id: sectionId,
                    order,
                    is_required: isRequired,
                });
                const updatedQuestions = (questions || []).map((question) =>
                    question.id === questionId ? data.data : question,
                );
                mutateQuestions(updatedQuestions, false); // Mutate and revalidate
                return data.data;
            } catch (error) {
                console.error("Error updating question:", error);
                throw error;
            }
        },

        deleteQuestion: async (questionId: number) => {
            try {
                await api.delete(`/questions/${questionId}`);
                const updatedQuestions = (questions || []).filter(
                    (question) => question.id !== questionId,
                );
                mutateQuestions(updatedQuestions, false); // Mutate and revalidate
            } catch (error) {
                console.error("Error deleting question:", error);
                throw error;
            }
        },
    }));
};

export const QuestionContext = createContext<StoreApi<QuestionState> | null>(
    null,
);

export function QuestionProvider({ children }: { children: ReactNode }) {
    const questionStore = useQuestionStore(); // Call the useQuestionStore function
    return (
        <QuestionContext.Provider value={questionStore}>
            {children}
        </QuestionContext.Provider>
    );
}

const useQuestions = () => {
    const context = useContext(QuestionContext);
    if (!context) {
        throw new Error("useQuestions must be used within a QuestionProvider");
    }
    return context.getState();
};

export default useQuestions;
