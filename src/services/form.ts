import api from "@/services/api";
import { Form, ApiResponse } from "@@/types";
import { GeneratedForm } from "./prompt";

export interface CreateFormOptions {
    name: Form["name"];
    description?: Form["description"];
}

export const createForm = async (options: CreateFormOptions) => {
    const { data } = await api.post<ApiResponse<Form>>("/forms", options);
    return data;
};

export const createNestedForm = async (form: GeneratedForm) => {
    const { data } = await api.post<ApiResponse<Form>>("/forms/nested", form);
    return data;
};
