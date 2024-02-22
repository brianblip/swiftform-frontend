import api from "@/services/api";
import { Form, ApiResponse } from "@@/types";

export interface CreateFormOptions {
    name: Form["name"];
}

export const createForm = async ({ name }: CreateFormOptions) => {
    const { data } = await api.post<ApiResponse<Form>>("/forms", { name });
    return data;
};
