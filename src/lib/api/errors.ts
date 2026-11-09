import { AxiosError } from "axios";

export class ApiError extends Error {
  readonly status: number;
  readonly code: string;
  readonly detail: unknown;

  constructor(params: {
    message: string;
    status: number;
    code: string;
    detail?: unknown;
  }) {
    super(params.message);
    this.name = "ApiError";
    this.status = params.status;
    this.code = params.code;
    this.detail = params.detail;
  }
}

export function toApiError(error: unknown): ApiError {
  if (error instanceof ApiError) return error;

  if (error instanceof AxiosError) {
    const status = error.response?.status ?? 0;
    const data = error.response?.data as { detail?: unknown } | undefined;
    const detail = data?.detail;
    const message =
      typeof detail === "string" ? detail : (error.message ?? "Request failed");
    return new ApiError({
      message,
      status,
      code: status === 0 ? "network_error" : `http_${status}`,
      detail,
    });
  }

  return new ApiError({
    message: error instanceof Error ? error.message : "Unknown error",
    status: 0,
    code: "unknown",
  });
}
