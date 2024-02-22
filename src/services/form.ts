import api from "@/services/api";
import { Form, ApiResponse } from "@@/types";

export interface CreateFormOptions {
    name: Form["name"];
    description?: Form["description"];
}

export const createForm = async (options: CreateFormOptions) => {
    const { data } = await api.post<ApiResponse<Form>>("/forms", options);
    return data;
};
