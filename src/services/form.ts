import api from "@/services/api";
import { Form, ApiResponse } from "@@/types";

export const createForm = async (name: Form["name"]) => {
    const { data } = await api.post<ApiResponse<Form>>("/forms", { name });
    return data;
};
