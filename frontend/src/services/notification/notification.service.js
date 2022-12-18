import { toastr } from 'react-redux-toastr';

class Notification {
    #instance;

    constructor() {
        this.#instance = toastr;
    }

    _getFullMessage(messages) {
        return messages.join(', ');
    }

    error(title, messages, options) {
        this.#instance.error(title, this._getFullMessage(messages), options);
    }

    success(title, messages, options) {
        this.#instance.success(title, this._getFullMessage(messages), options);
    }

    info(title, messages, options) {
        this.#instance.info(title, this._getFullMessage(messages), options);
    }
}

export { Notification };
