import api from "@/services/api";

export const fetcher = async (url: string) => {
    const { data } = await api.get(url);
    return data.data;
};
