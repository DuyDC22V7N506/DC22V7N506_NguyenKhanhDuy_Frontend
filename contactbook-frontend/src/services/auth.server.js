import createApiClient from "./api.service";

class AuthService {
    constructor(baseUrl = "/api/auth") {
        this.api = createApiClient(baseUrl);
    }

    async register(data) {
        return (await this.api.post("/register", data)).data;
    }

    async login(data) {
    const response = await this.api.post("/login", data);
    return response.data; // phải có dòng này
}

    async forgotPassword(data) {
        return (await this.api.post("/forgot-password", data)).data;
    }

    logout() {
        localStorage.removeItem("user");
    }
}

export default new AuthService(); // ❗ KHÔNG dùng new ở component nữa