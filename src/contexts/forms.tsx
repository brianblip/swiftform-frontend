"use client";

import useSWR, { mutate } from "swr";
import {
    Form,
    Question,
    QuestionType,
    Section,
    Choice,
    CreateFormData,
    FormState,
} from "@@/types";
import api from "@/services/api";
import { createContext, ReactNode, useContext } from "react";
import { ApiResponse } from "@@/types";

const useFormStore = (): FormState => {
    const fetcher = async (url: string) => {
        const { data } = await api.get(url);
        return data.data || data;
    };

    const { data: forms, error } = useSWR<Form[]>("/forms", fetcher);

    const getForm = (formId: number) =>
        (forms || []).find((form) => form.id === formId) || null;

    const updateFormsMutate = (updatedForms: (Form | undefined)[]) =>
        mutate("/forms", updatedForms.filter(Boolean) as Form[], false);

    const createForm = async (formData: CreateFormData) => {
        try {
            const { data } = await api.post<ApiResponse<Form>>(
                "/forms",
                formData,
            );
            const newForm = data.data;
            if (!newForm) throw new Error("Error creating form");
            updateFormsMutate([...(forms || []), newForm]);
            return newForm;
        } catch (error) {
            console.error("Error creating form:", error);
            throw error;
        }
    };

    const updateForm = async (formId: number, formData: Form) => {
        const response = await api.put<ApiResponse<Form>>(
            `/forms/${formId}`,
            formData,
        );
        const updatedForms = (forms || []).map((form) =>
            form.id === formId ? response.data.data : form,
        );
        updateFormsMutate(updatedForms);
        return response.data;
    };

    const deleteForm = async (formId: number) => {
        try {
            await api.delete(`/forms/${formId}`);
            const updatedForms = (forms || []).filter(
                (form) => form.id !== formId,
            );
            updateFormsMutate(updatedForms);
        } catch (error) {
            console.error("Error deleting form:", error);
            throw error;
        }
    };

    const createSection = async (
        title: string,
        formId: number,
        order: number,
    ) => {
        try {
            const { data } = await api.post("/sections", {
                title,
                form_id: formId,
                order,
            });
            const newSection = data.data;
            const updatedForms = (forms || []).map((form) =>
                form.id === formId
                    ? { ...form, sections: [...form.sections, newSection] }
                    : form,
            );
            updateFormsMutate(updatedForms);
            return newSection;
        } catch (error) {
            console.error("Error creating section:", error);
            throw error;
        }
    };

    const updateSection = async (
        sectionId: number,
        title: string,
        newOrder: number,
    ) => {
        try {
            const { data } = await api.put(`/sections/${sectionId}`, {
                title,
                order: newOrder,
            });
            const updatedForms = (forms || []).map((form) => ({
                ...form,
                sections: form.sections.map((section) =>
                    section.id === sectionId
                        ? { ...section, title, order: newOrder }
                        : section,
                ),
            }));
            updateFormsMutate(updatedForms);
            return data.data;
        } catch (error) {
            console.error("Error updating section:", error);
            throw error;
        }
    };

    const deleteSection = async (sectionId: number) => {
        try {
            await api.delete(`/sections/${sectionId}`);
            const updatedForms = (forms || []).map((form) => ({
                ...form,
                sections: form.sections.filter(
                    (section) => section.id !== sectionId,
                ),
            }));
            updateFormsMutate(updatedForms);
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
            const newQuestion = data.data as Question;
            const updatedForms = (forms || []).map((form) => ({
                ...form,
                sections: form.sections.map((section) =>
                    section.id === sectionId
                        ? {
                              ...section,
                              questions: [...section.questions, newQuestion],
                          }
                        : section,
                ),
            }));
            updateFormsMutate(updatedForms);
            return newQuestion;
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
            const updatedForms = (forms || []).map((form) => ({
                ...form,
                sections: form.sections.map((section) => ({
                    ...section,
                    questions: section.questions.map((question) =>
                        question.id === questionId ? data.data : question,
                    ),
                })),
            }));
            updateFormsMutate(updatedForms);
            return data.data;
        } catch (error) {
            console.error("Error updating question:", error);
            throw error;
        }
    };

    const deleteQuestion = async (questionId: number) => {
        try {
            await api.delete(`/questions/${questionId}`);
            const updatedForms = (forms || []).map((form) => ({
                ...form,
                sections: form.sections.map((section) => ({
                    ...section,
                    questions: section.questions.filter(
                        (question) => question.id !== questionId,
                    ),
                })),
            }));
            updateFormsMutate(updatedForms);
        } catch (error) {
            console.error("Error deleting question:", error);
            throw error;
        }
    };

    const createChoice = async (
        text: string,
        questionId: number,
        order: number,
    ) => {
        try {
            const { data } = await api.post<ApiResponse<Choice>>("/choices", {
                text,
                question_id: questionId,
                order,
            });
            const newChoice = data.data as Choice;
            const updatedForms = (forms || []).map((form) => ({
                ...form,
                sections: form.sections.map((section) => ({
                    ...section,
                    questions: section.questions.map((question) =>
                        question.id === questionId
                            ? {
                                  ...question,
                                  choices: [...question.choices, newChoice],
                              }
                            : question,
                    ),
                })),
            }));
            updateFormsMutate(updatedForms);
            return newChoice;
        } catch (error) {
            console.error("Error creating choice:", error);
            throw error;
        }
    };

    const updateChoice = async (choiceId: number, text: string, order: number) => {
        try {
            const { data } = await api.put(`/choices/${choiceId}`, { text, order });
            const updatedForms = (forms || []).map((form) => ({
                ...form,
                sections: form.sections.map((section) => ({
                    ...section,
                    questions: section.questions.map((question) => ({
                        ...question,
                        choices: question.choices.map((choice) =>
                            choice.id === choiceId
                                ? { ...choice, text: data.data.text, order: data.data.order }
                                : choice,
                        ),
                    })),
                })),
            }));
            updateFormsMutate(updatedForms);
            return data.data;
        } catch (error) {
            console.error("Error updating choice:", error);
            throw error;
        }
    };

    const deleteChoice = async (choiceId: number) => {
        try {
            await api.delete(`/choices/${choiceId}`);
            const updatedForms = (forms || []).map((form) => ({
                ...form,
                sections: form.sections.map((section) => ({
                    ...section,
                    questions: section.questions.map((question) => ({
                        ...question,
                        choices: question.choices.filter(
                            (choice) => choice.id !== choiceId,
                        ),
                    })),
                })),
            }));
            updateFormsMutate(updatedForms);
        } catch (error) {
            console.error("Error deleting choice:", error);
            throw error;
        }
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
        createChoice,
        updateChoice,
        deleteChoice,
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
