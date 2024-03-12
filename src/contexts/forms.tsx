"use client";

import useSWR, { mutate } from "swr";
import { Form, Question, QuestionType, Section } from "@@/types";
import api from "@/services/api";
import { createContext, ReactNode, useContext } from "react";
import { ApiResponse } from "@@/types";

export type CreateFormData = Partial<Pick<Form, "name" | "description">>;

export type FormState = {
    forms: Form[];
    isLoading: boolean;
    error: Error | null;
    getForm: (formId: number) => Form | null;
    createForm: (formData: CreateFormData) => Promise<Form>;
    updateForm: (formId: number, formData: Form) => Promise<Form>;
    deleteForm: (formId: number) => Promise<void>;
    createSection: (title: string, formId: number) => Promise<Section>;
    updateSection: (sectionId: number, title: string) => Promise<Section>;
    deleteSection: (sectionId: number) => Promise<void>;
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

const useFormStore = (): FormState => {
    const fetcher = async (url: string) => {
        const { data } = await api.get(url);
        return data.data || data;
    };

    const { data: forms, error } = useSWR<Form[]>("/forms", fetcher);

    const createForm = async (formData: CreateFormData) => {
        try {
            const { data } = await api.post<ApiResponse<Form>>(
                "/forms",
                formData,
            );

            const newForm = data.data;

            if (!newForm) throw new Error("Error creating form");

            mutate("/forms", [...(forms || []), newForm], false);
            return newForm;
        } catch (error) {
            console.error("Error creating form:", error);
            throw error;
        }
    };

    const updateForm = async (formId: number, formData: Form) => {
        try {
            const { data } = await api.put(`/forms/${formId}`, formData);
            const updatedForms = (forms || []).map((form) =>
                form.id === formId ? data.data : form,
            );
            mutate("/forms", updatedForms, false);
            return data.data;
        } catch (error) {
            console.error("Error updating form:", error);
            throw error;
        }
    };

    const deleteForm = async (formId: number) => {
        try {
            await api.delete(`/forms/${formId}`);
            const updatedForms = (forms || []).filter(
                (form) => form.id !== formId,
            );
            mutate("/forms", updatedForms, false);
        } catch (error) {
            console.error("Error deleting form:", error);
            throw error;
        }
    };

    const createSection = async (title: string, formId: number) => {
        try {
            const { data } = await api.post("/sections", {
                title,
                form_id: formId,
            });
            mutate("/forms", [...(forms || []), data.data], false);
            return data.data;
        } catch (error) {
            console.error("Error creating section:", error);
            throw error;
        }
    };

    const updateSection = async (sectionId: number, title: string) => {
        try {
            const { data } = await api.put(`/sections/${sectionId}`, {
                title,
            });
            const updatedSections = (forms || []).map((form) => {
                const updatedSection = form.sections.find(
                    (section) => section.id === sectionId,
                );
                if (updatedSection) {
                    updatedSection.title = title;
                }
                return form;
            });
            mutate("/forms", updatedSections, false);
            return data.data;
        } catch (error) {
            console.error("Error updating section:", error);
            throw error;
        }
    };

    const deleteSection = async (sectionId: number) => {
        try {
            await api.delete(`/sections/${sectionId}`);
            const updatedForms = (forms || []).map((form) => {
                form.sections = form.sections.filter(
                    (section) => section.id !== sectionId,
                );
                return form;
            });
            mutate("/forms", updatedForms, false);
        } catch (error) {
            console.error("Error deleting section:", error);
            throw error;
        }
    };

    const createQuestion = async (
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
            
            mutate("/forms", [...(forms || []), data.data], false);
            return data.data;
        } catch (error) {
            console.error("Error creating question:", error);
            throw error;
        }
    };
    
    const updateQuestion = async (
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
            const updatedQuestions = (forms || []).map((question) =>
                question.id === questionId ? data.data : question,
            );
            mutate("/forms", updatedQuestions, false); // Mutate and revalidate
            return data.data;
        } catch (error) {
            console.error("Error updating question:", error);
            throw error;
        }
    };
    
    const deleteQuestion = async (questionId: number) => {
        try {
            await api.delete(`/questions/${questionId}`);
            const updatedQuestions = (forms || []).filter(
                (question) => question.id !== questionId,
            );
            mutate("/forms", updatedQuestions, false); // Mutate and revalidate
        } catch (error) {
            console.error("Error deleting question:", error);
            throw error;
        }
    };

    const getForm = (formId: number) => {
        return (forms || []).find((form) => form.id === formId) || null;
    };

    return {
        forms: forms || [],
        isLoading: !forms,
        error: null,
        getForm,
        createForm,
        updateForm,
        deleteForm,
        createSection,
        updateSection,
        deleteSection,
        createQuestion,
        updateQuestion,
        deleteQuestion,
    };
};

export const FormContext = createContext<FormState | undefined>(undefined);

export function FormProvider({ children }: { children: ReactNode }) {
    const formState = useFormStore();
    return (
        <FormContext.Provider value={formState}>
            {children}
        </FormContext.Provider>
    );
}

const useForm = (): FormState => {
    const formState = useContext(FormContext);
    if (formState === undefined) {
        throw new Error("useForm must be used within a FormProvider");
    }
    return formState;
};

export default useForm;
