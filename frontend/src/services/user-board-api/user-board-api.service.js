import { HttpMethod, UserBoardsApiPath, ApiPath, ContentType } from 'common/enums';

class UserBoardApi {
    #http;
    #apiPrefix;

    constructor({ http, apiPrefix }) {
        this.#http = http;
        this.#apiPrefix = apiPrefix;
    }

    createUserBoard(payload) {
        return this.#http.load(
            `${this.#apiPrefix}${ApiPath.USERS_BOARDS}${UserBoardsApiPath.ROOT}`,
            {
                method: HttpMethod.POST,
                contentType: ContentType.JSON,
                payload
            }
        );
    }
}

export { UserBoardApi };
