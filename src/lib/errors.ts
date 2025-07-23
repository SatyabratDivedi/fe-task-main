import { ApiError } from "next/dist/server/api-utils";
import axios, { type AxiosError } from "axios";
import { toast } from "react-toastify";

import { toTitlecase } from "./utils";

export function errorToast(err: unknown) {
  const error = err as Error;
  toast.error(error.message);
}

export function handleAPIError(err: unknown): ApiError {
  if (axios.isAxiosError(err)) {
    const error = err as AxiosError;
    const response = error.response;
    const data = response?.data;
    if (data) {
      const msg = (data as { message: string })?.message;
      if (msg) {
        return new ApiError(response.status, toTitlecase(msg));
      }
    }
  }
  return new ApiError(500, "An error occurred");
}
