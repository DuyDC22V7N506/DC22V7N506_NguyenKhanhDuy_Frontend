import axios from "axios";

const createApiClient = (baseURL) => {
    const api = axios.create({
        baseURL,
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    });

    api.interceptors.request.use(
        (config) => {
            let user = null;

            try {
                user = JSON.parse(localStorage.getItem("user"));
            } catch (e) {
                user = null;
            }

            if (user?.accessToken) {
                config.headers = config.headers || {};
                config.headers.Authorization = `Bearer ${user.accessToken}`;
            }

            return config;
        },
        (error) => Promise.reject(error)
    );

    api.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response?.status === 401) {
                localStorage.removeItem("user");
                window.location.replace("/login");
            }
            return Promise.reject(error);
        }
    );

    return api;
};

export default createApiClient;