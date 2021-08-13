import { AxiosError } from "axios";

import { API_ERRORS_TYPE, USER_LEFT_THE_PAGE } from "~utils";

export const throwCurrentErrorType = (e: AxiosError): void => {
  if (e.message === USER_LEFT_THE_PAGE) {
    return;
  }

  switch (e.request.status) {
    case 400:
      throw new Error(API_ERRORS_TYPE.BAD_REQUEST);
      break;
    case 404:
      throw new Error(API_ERRORS_TYPE.NOT_FOUND);
      break;
    case 500:
      throw new Error(API_ERRORS_TYPE.SERVER_ERROR);
      break;
    case 403:
      throw new Error(API_ERRORS_TYPE.FORBIDDEN);
      break;
    case 502:
      throw new Error(API_ERRORS_TYPE.BAD_GATEWAY);
      break;
    case 504:
      throw new Error(API_ERRORS_TYPE.GATEWAY_TYMEOUT);
      break;
    default:
      throw new Error();
      break;
  }
};
