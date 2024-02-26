import useSWR from "swr";
import { Form } from "@@/types";
import api from "@/services/api";
import { createStore, StoreApi } from "zustand";
import { createContext, ReactNode, useContext } from "react";

export type CreateFormData = Omit<Form, "created_at" | "updated_at">;

type FormState = {
    form?: Form | null;
    isLoading: boolean;
    error: string | null;
    fetchForm: (formId: number) => Promise<Form>;
    createForm: (formData: CreateFormData) => Promise<Form>;
    updateForm: (formId: number, formData: Form) => Promise<Form>;
    deleteForm: (formId: number) => Promise<void>;
};

const useFormStore = (defaultFormId: number | null) => {
    const fetcher = async (url: string) => {
        const { data } = await api.get(url);
        return data.data || data;
    };

    const {
        data: form,
        isLoading,
        error,
        mutate,
    } = useSWR<Form | null>(
        defaultFormId ? `/forms/${defaultFormId}` : null,
        fetcher,
    );

    return createStore<FormState>((set) => ({
        form,
        isLoading,
        error,

        fetchForm: async (formId: number) => {
            try {
                const { data } = await api.get(`/forms/${formId}`);
                console.log("Fetched form data:", data); // Log the fetched data
                await mutate(data.data);
                return data.data;
            } catch (error) {
                console.error("Error fetching form:", error);
                throw error;
            }
        },

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
                await mutate(null);
            } catch (error) {
                console.error("Error deleting form:", error);
                throw error;
            }
        },
    }));
};

export const FormContext =
    createContext<(defaultFormId: number | null) => StoreApi<FormState>>(
        useFormStore,
    );

export function FormProvider({ children }: { children: ReactNode }) {
    return (
        <FormContext.Provider value={useFormStore}>
            {children}
        </FormContext.Provider>
    );
}

const useForm = (defaultFormId: number | null) => {
    return useContext(FormContext)(defaultFormId).getState();
};

export default useForm;
