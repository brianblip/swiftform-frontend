"use client";
import useSWR from "swr";
import { Form } from "@@/types";
import api from "@/services/api";
import { createStore, StoreApi } from "zustand";
import { createContext, ReactNode, useContext } from "react";

export type CreateFormData = Omit<Form, "created_at" | "updated_at">;

type FormState = {
    forms: Form[];
    isLoading: boolean;
    error: Error | null;
    createForm: (formData: CreateFormData) => Promise<Form>;
    updateForm: (formId: number, formData: Form) => Promise<Form>;
    deleteForm: (formId: number) => Promise<void>;
};

const useFormStore = () => {
    const fetcher = async (url: string) => {
        const { data } = await api.get(url);
        return data.data || data;
    };

    const {
        data: forms,
        isLoading,
        error,
        mutate,
    } = useSWR<Form[]>("/forms", fetcher);

    return createStore<FormState>((set) => ({
        forms: forms || [],
        isLoading,
        error,

        createForm: async (formData: CreateFormData) => {
            try {
                const { data } = await api.post("/forms", formData);
                await mutate(data.data);
                return data.data;
            } catch (error) {
                console.error("Error creating form:", error);
                throw error;
            }
        },

        updateForm: async (formId: number, formData: Form) => {
            try {
                const { data } = await api.put(`/forms/${formId}`, formData);
                await mutate(data.data);
                return data.data;
            } catch (error) {
                console.error("Error updating form:", error);
                throw error;
            }
        },

        deleteForm: async (formId: number) => {
            try {
                await api.delete(`/forms/${formId}`);
                await mutate([]);
            } catch (error) {
                console.error("Error deleting form:", error);
                throw error;
            }
        },
    }));
};

export const FormContext =
    createContext<() => StoreApi<FormState>>(useFormStore);

export function FormProvider({ children }: { children: ReactNode }) {
    return (
        <FormContext.Provider value={useFormStore}>
            {children}
        </FormContext.Provider>
    );
}

const useForm = () => useContext(FormContext)().getState();

export default useForm;
