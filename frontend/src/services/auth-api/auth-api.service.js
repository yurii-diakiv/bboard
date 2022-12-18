class AuthApi {
    #http;
    #apiPrefix;

    constructor({ http, apiPrefix }) {
        this.#http = http;
        this.#apiPrefix = apiPrefix;
    }

    loginUser(payload) {
        return this.#http.load(
            `${this.#apiPrefix}/auth/login`,
            {
                method: 'POST',
                contentType: 'application/json',
                payload,
                hasAuth: false,
            }
        );
    }

    registrationUser(payload) {
        return this.#http.load(
            `${this.#apiPrefix}/auth/sign-up`,
            {
                method: 'POST',
                contentType: 'application/json',
                payload,
                hasAuth: false,
            }
        );
    }

    getCurrentUser() {
        return this.#http.load(`${this.#apiPrefix}/auth`,
            {
                method: "GET",
            }
        );
    }
}

export { AuthApi };
