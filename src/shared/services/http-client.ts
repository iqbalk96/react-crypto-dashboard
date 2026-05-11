import { api } from './api';

import {
  onRequest,
  onRequestError,
  onResponse,
  onResponseError,
} from './interceptors';

api.interceptors.request.use(
  onRequest,
  onRequestError
);

api.interceptors.response.use(
  onResponse,
  onResponseError
);

export { api };