import { HttpMethod, CardsApiPath, ApiPath, ContentType } from 'common/enums';

class CardApi {
    #http;
    #apiPrefix;

    constructor({ http, apiPrefix }) {
        this.#http = http;
        this.#apiPrefix = apiPrefix;
    }

    updateCard(id, payload) {
        return this.#http.load(`${this.#apiPrefix}${ApiPath.CARDS}${CardsApiPath.ROOT}${id}`, {
            method: HttpMethod.PUT,
            contentType: ContentType.JSON,
            payload
        });
    }

    createCard(payload) {
        return this.#http.load(`${this.#apiPrefix}${ApiPath.CARDS}${CardsApiPath.ROOT}`, {
            method: HttpMethod.POST,
            contentType: ContentType.JSON,
            payload
        });
    }

    removeCard(id) {
        return this.#http.load(`${this.#apiPrefix}${ApiPath.CARDS}${CardsApiPath.ROOT}${id}`, {
            method: HttpMethod.DELETE,
        });
    }
}

export { CardApi };
