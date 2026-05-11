import type {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

export function onRequest(
  config: InternalAxiosRequestConfig
) {
  return config;
}

export function onRequestError(error: AxiosError) {
  return Promise.reject(error);
}

export function onResponse(
  response: AxiosResponse
) {
  return response;
}

export function onResponseError(error: AxiosError) {
  return Promise.reject(error);
}