class UserApi {
    #http;
    #apiPrefix;
    constructor({ http, apiPrefix }) {
        this.#http = http;
        this.#apiPrefix = apiPrefix;
    }
    registerUser(payload) {
        return this.#http.load(
            `${this.#apiPrefix}/users/root`,
            {
                method: 'POST',
                contentType: 'application/json',
                payload,
            },
        );
    }

    getUsers() {
        return this.#http.load(
            `${this.#apiPrefix}/users`,
            {
                method: "GET",
            },
        );
    }

    getUser(id) {
        return this.#http.load(
            `${this.#apiPrefix}/users/${id}`,
            {
                method: "GET",
            },
        );
    }
}

export { UserApi };
