import defaultAxios from "axios";

const api = defaultAxios.create({
    baseURL: process.env.SWIFTFORM_API_URL,
    withCredentials: true,
});

export default api;
