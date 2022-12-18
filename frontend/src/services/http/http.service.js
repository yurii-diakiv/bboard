import { HttpError } from 'exceptions';
import { ContentType, HttpHeader, HttpMethod, StorageKey } from 'common/enums';
import { storage } from 'services';

class Http {
    load(url, options = {}) {
        const {
            method = HttpMethod.GET,
            payload = null,
            hasAuth = true,
            contentType,
        } = options;

        const headers = this._getHeaders(hasAuth, contentType);
        const isJSON = contentType === ContentType.JSON;
        return fetch(url, {
            method,
            headers,
            body: isJSON ? JSON.stringify(payload) : payload,
        })
            .then(this._checkStatus)
            .then(res => this._parseJSON(res))
            .catch(this._throwError);
    }

    _getHeaders(hasAuth, contentType) {
        const headers = new Headers();
        const token = storage.getItem(StorageKey.TOKEN);

        if (contentType) {
            headers.append(HttpHeader.CONTENT_TYPE, contentType);
        }

        if (hasAuth) {
            headers.append(HttpHeader.AUTHORIZATION, `Bearer ${token}`);
        }

        return headers;
    }

    async _checkStatus(response) {
        if (!response.ok) {
            const parsedException = await response.json();
            throw new HttpError({
                status: response.status,
                messages: parsedException?.messages,
            });
        }
        return response;
    }

    _parseJSON(response) {
        return response.json();
    }

    _throwError(err) {
        throw err;
    }
}

export { Http };
