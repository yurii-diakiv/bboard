import { ENV } from 'common/enums';
import { Http } from './http/http.service';
import { Storage } from './storage/storage.service';
import { ColumnApi } from './column-api/column-api.service';
import { CardApi } from './card-api/card-api.service';
import { AuthApi } from './auth-api/auth-api.service';
import { UserApi } from './user-api/user-api.service';
import { BoardApi } from './board-api/board-api.service';
import { UserBoardApi } from './user-board-api/user-board-api.service';
import { Notification } from './notification/notification.service';

const http = new Http();

const notification = new Notification();
const storage = new Storage({ storage: localStorage });

const columnApi = new ColumnApi({ http, apiPrefix: ENV.API_PATH });
const cardApi = new CardApi({ http, apiPrefix: ENV.API_PATH });
const authApi = new AuthApi({ http, apiPrefix: ENV.API_PATH });
const userApi = new UserApi({ http, apiPrefix: ENV.API_PATH });
const boardApi = new BoardApi({ http, apiPrefix: ENV.API_PATH });
const userBoardApi = new UserBoardApi({ http, apiPrefix: ENV.API_PATH });

export {
    storage,
    notification,
    columnApi,
    authApi,
    userApi,
    boardApi,
    cardApi,
    userBoardApi
};
