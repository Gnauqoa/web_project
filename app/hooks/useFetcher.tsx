import {
  type FormMethod,
  useFetcher as useRemixFetcher,
  type FormEncType,
} from "@remix-run/react";
import { useEffect } from "react";

export enum StatusResponse {
  idle = "idle",
  success = "success",
  error = "error",
}
export type ResponseType<T> = {
  submission?: T;
  status: StatusResponse;
  message?: string;
};
export type useFetcherProps<T> = {
  auto?: boolean;
  action?: string;
  method?: FormMethod;
  data?: any;
  onSuccess?: (data: ResponseType<T>) => void;
  onError?: (data: ResponseType<T>) => void;
  encType?: FormEncType;
};

/**
 * A hook for fetching data using Remix's fetcher. Only use with response type {submission: @object, message: @string status: @number}
 * @param action - The URL to fetch data from.
 * @param method - The HTTP method to use for the request.
 * @param data - The data to send with the request.
 * @param onSuccess - A callback function to be called when the request is successful.
 * @returns An object containing the fetcher, a function to handle form submission, and a loading state.
 */
function useFetcher<T>({
  action,
  method,
  data = null,
  auto = false,
  onSuccess,
  onError,
  encType,
}: useFetcherProps<T>) {
  const fetcher = useRemixFetcher();
  const handleSubmit = () => {
    fetcher.submit(data, { method, action, encType });
  };
  const handleSubmitWithData = ({
    _data,
    _action,
  }: {
    _data?: any | null | undefined;
    _action?: string;
  }) => {
    fetcher.submit(_data, { method, action: _action || action, encType });
  };
  useEffect(() => {
    if (!fetcher.data) return;
    const data = fetcher.data as ResponseType<T>;
    if (fetcher.state === "idle") {
      if (data.status && data.status === StatusResponse.success && onSuccess)
        onSuccess(data);
      else if (onError) onError(data);
    }
  }, [fetcher]);
  useEffect(() => {
    if (auto) handleSubmit();
  }, [action]);
  return {
    fetcher,
    handleSubmit,
    handleSubmitWithData,
    loading: fetcher.state !== "idle",
  };
}

/**
 * The type of data returned by the fetcher.
 * @typedef {Object} FetcherResponseType
 * @property {Object} data - The data returned by the fetcher.
 * @property {number} status - The HTTP status code returned by the fetcher.
 */

/**
 * The props for the useFetcher hook.
 * @typedef {Object} useFetcherProps
 * @property {string} action - The URL to fetch data from.
 * @property {string} method - The HTTP method to use for the request.
 * @property {Object} data - The data to send with the request.
 * @property {Function} onSuccess - A callback function to be called when the request is successful.
 */

export default useFetcher;
