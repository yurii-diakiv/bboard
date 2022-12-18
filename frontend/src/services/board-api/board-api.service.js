import * as queryString from 'query-string';
import { HttpMethod, BoardsApiPath, ApiPath, ContentType } from 'common/enums';

class BoardApi {
    #http;
    #apiPrefix;

    constructor({ http, apiPrefix }) {
        this.#http = http;
        this.#apiPrefix = apiPrefix;
    }

    getBoards(filter) {
        return this.#http.load(
            `${this.#apiPrefix}${ApiPath.BOARDS}${BoardsApiPath.ROOT}${(filter ? `?${queryString.stringify(filter)}` : '')}`,
            {
                method: HttpMethod.GET
            }
        );
    }

    createBoard(payload) {
        return this.#http.load(
            `${this.#apiPrefix}${ApiPath.BOARDS}${BoardsApiPath.ROOT}`,
            {
                method: HttpMethod.POST,
                contentType: ContentType.JSON,
                payload
            }
        );
    }

    getBoard(id) {
        return this.#http.load(
            `${this.#apiPrefix}${ApiPath.BOARDS}${BoardsApiPath.ROOT}${id}`,
            {
                method: HttpMethod.GET,
            }
        );
    }
}

export { BoardApi };
