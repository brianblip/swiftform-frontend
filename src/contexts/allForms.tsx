"use client";
import useSWR from "swr";
import { Form } from "@@/types";
import api from "@/services/api";
import { createStore, StoreApi } from "zustand";
import { createContext, ReactNode, useContext } from "react";

type FormState = {
    forms: Form[];
    isLoading: boolean;
    error: string | null;
    fetchForms: () => Promise<Form[]>;
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

        fetchForms: async () => {
            try {
                const { data } = await api.get("/forms");
                await mutate(data.data);
                return data.data;
            } catch (error) {
                console.error("Error fetching forms:", error);
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
