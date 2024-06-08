import { HttpStatus } from '@nestjs/common';
import { ApiResponseOptions } from '@nestjs/swagger';

type ErrorType =
  | 'INVALID_OR_MISSING_PARAMS'
  | 'UNAUTHORIZED'
  | 'NOT_FOUND'
  | 'BAD_REQUEST';

type KeysOfError = {
  [key in ErrorType]: ApiResponseOptions;
};

export const ApiResponseErrors: KeysOfError = {
  INVALID_OR_MISSING_PARAMS: {
    description: 'Invalid or missing params error',
    status: HttpStatus.BAD_REQUEST,
    schema: {
      example: {
        statusCode: HttpStatus.BAD_REQUEST,
        message: ['example param must be a string'],
        error: 'Bad Request',
      },
    },
  },
  UNAUTHORIZED: {
    description: 'Access token is missing, invalid or expired',
    status: HttpStatus.UNAUTHORIZED,
    schema: {
      example: { statusCode: HttpStatus.UNAUTHORIZED, message: 'Unauthorized' },
    },
  },
  NOT_FOUND: {
    status: HttpStatus.NOT_FOUND,
    schema: {
      example: {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Not Found',
        error: 'Not Found',
      },
    },
  },
  BAD_REQUEST: {
    status: HttpStatus.BAD_REQUEST,
    schema: {
      example: {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Bad Request',
        error: 'Bad Request',
      },
    },
  },
};
