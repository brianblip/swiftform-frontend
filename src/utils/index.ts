import api from "@/services/api";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

export const fetcher = async (url: string) => {
    const { data } = await api.get(url);
    return data.data;
};

export const handleApiError = (e: unknown) => {
    if (e instanceof AxiosError) {
        toast.error(e.response?.data.message || e.message);
    } else {
        toast.error("An unkown error occurred. Please try again.");
    }
};
