class Storage {
    #storage;

    constructor({ storage }) {
        this.#storage = storage;
    }

    getItem(key) {
        return this.#storage.getItem(key);
    }

    setItem(key, value) {
        return this.#storage.setItem(key, value);
    }

    removeItem(key) {
        return this.#storage.removeItem(key);
    }

    clear() {
        return this.#storage.clear();
    }
}

export { Storage };
