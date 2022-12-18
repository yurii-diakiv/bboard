import { HttpMethod, ColumnsApiPath, ApiPath, ContentType } from 'common/enums';
import * as queryString from 'query-string';

class ColumnApi {
    #http;
    #apiPrefix;

    constructor({ http, apiPrefix }) {
        this.#http = http;
        this.#apiPrefix = apiPrefix;
    }

    getColumns(filter) {
        return this.#http.load(
            `${this.#apiPrefix}${ApiPath.COLUMNS}${ColumnsApiPath.ROOT}${(filter ? `?${queryString.stringify(filter)}` : '')}`,
            {
                method: HttpMethod.GET
            }
        );
    }

    createColumn(payload) {
        return this.#http.load(
            `${this.#apiPrefix}${ApiPath.COLUMNS}${ColumnsApiPath.ROOT}`,
            {
                method: HttpMethod.POST,
                contentType: ContentType.JSON,
                payload
            }
        );
    }

    removeColumn(id) {
        return this.#http.load(
            `${this.#apiPrefix}${ApiPath.COLUMNS}${ColumnsApiPath.ROOT}${id}`,
            {
                method: HttpMethod.DELETE,
            }
        );
    }

    updateColumn(id, payload) {
        return this.#http.load(
            `${this.#apiPrefix}${ApiPath.COLUMNS}${ColumnsApiPath.ROOT}${id}`,
            {
                method: HttpMethod.PUT,
                contentType: ContentType.JSON,
                payload
            }
        );
    }
}

export { ColumnApi };
