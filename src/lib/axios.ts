import defaultAxios from "axios";

const axios = defaultAxios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_API_URL,
    withCredentials: true,
});

export default axios;
