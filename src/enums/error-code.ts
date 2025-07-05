export interface ErrorDetails {
  [key: string]: {
    statusCode: number;
    code: string;
    message: string;
  }
}

export const ErrorDetailsMap: ErrorDetails = {
  INTERNAL_ERROR: {
    statusCode: 500,
    code: 'OPENAPI_INTERNAL_ERROR',
    message: 'OPEN-API | An unexpected error occurred.',
  },
  SERVICE_UNAVAILABLE: {
    statusCode: 503,
    code: 'OPENAPI_SERVICE_UNAVAILABLE',
    message: 'OPEN-API | The service is temporarily unavailable.',
  },
  BAD_REQUEST: {
    statusCode: 400,
    code: 'OPENAPI_BAD_REQUEST',
    message: 'OPEN-API | The request could not be understood or is missing required parameters.',
  },
  UNAUTHORIZED: {
    statusCode: 401,
    code: 'OPENAPI_UNAUTHORIZED',
    message: 'OPEN-API | The request lacks valid authentication credentials.',
  },
  FORBIDDEN: {
    statusCode: 403,
    code: 'OPENAPI_FORBIDDEN',
    message: 'OPEN-API | The server understood the request but refuses to authorize it.',
  },
  NOT_FOUND: {
    statusCode: 404,
    code: 'OPENAPI_NOT_FOUND',
    message: 'OPEN-API | The requested resource could not be found.',
  },
  CONFLICT: {
    statusCode: 409,
    code: 'OPENAPI_CONFLICT',
    message: 'OPEN-API | The request could not be completed due to a conflict with the current state of the resource (e.g., attempting to create a duplicate resource).',
  },
  RATE_LIMIT_EXCEEDED: {
    statusCode: 429,
    code: 'OPENAPI_RATE_LIMIT_EXCEEDED',
    message: 'OPEN-API | The request exceeds the rate limit allowed for the user or client.',
  },
  FILE_SIZE_LIMIT_EXCEEDED: {
    statusCode: 413,
    code: 'OPENAPI_FILE_SIZE_LIMIT_EXCEEDED',
    message: 'OPEN-API | The uploaded file exceeds the size limit.',
  },
  FILE_TYPE_NOT_SUPPORTED: {
    statusCode: 415,
    code: 'OPENAPI_FILE_TYPE_NOT_SUPPORTED',
    message: 'OPEN-API | he uploaded file type is not supported.',
  },
  MERCHANT_SIGN_INVALID: {
    statusCode: 403,
    code: 'OPENAPI_MERCHANT_SIGN_INVALID',
    message: 'OPEN-API | Merchant request sign invalid.'
  }
};

export enum ErrorCodes {
  INTERNAL_ERROR = 'INTERNAL_ERROR',
  SERVICE_UNAVAILABLE = 'SERVICE_UNAVAILABLE',
  BAD_REQUEST = 'BAD_REQUEST',
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  NOT_FOUND = 'NOT_FOUND',
  CONFLICT = 'CONFLICT',
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',
  FILE_SIZE_LIMIT_EXCEEDED = 'FILE_SIZE_LIMIT_EXCEEDED',
  FILE_TYPE_NOT_SUPPORTED = 'FILE_TYPE_NOT_SUPPORTED',
}