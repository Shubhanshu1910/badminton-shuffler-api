export interface ApiSuccessResponse<T> {
  readonly success: true;
  readonly message: string;
  readonly timestamp: string;
  readonly data: T;
}

export interface ApiErrorResponse {
  readonly success: false;
  readonly statusCode: number;
  readonly message: string;
  readonly path: string;
  readonly timestamp: string;
}
