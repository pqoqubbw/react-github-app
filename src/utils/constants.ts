export enum ROUTE_PATH {
  // eslint-disable-next-line no-unused-vars
  MAIN_PAGE = "/",
  // eslint-disable-next-line no-unused-vars
  USER_DETAILED_INFO = "/:nickname",
  // eslint-disable-next-line no-unused-vars
}

export const USER_LEFT_THE_PAGE = "USER_LEFT_THE_PAGE";
export const SEARCH_VALUE_STORAGE = "SEARCH_VALUE_STORAGE";
export const USER_DATA_STORAGE = "USER_DATA_STORAGE";

export enum API_ERRORS_TYPE {
  // eslint-disable-next-line no-unused-vars
  BAD_REQUEST = "Bad Request",
  // eslint-disable-next-line no-unused-vars
  NOT_FOUND = "Not Found",
  // eslint-disable-next-line no-unused-vars
  UNAUTHORIZED = "Unauthorized",
  // eslint-disable-next-line no-unused-vars
  SERVER_ERROR = "Server Error",
  // eslint-disable-next-line no-unused-vars
  BAD_GATEWAY = "Bad gateway",
  // eslint-disable-next-line no-unused-vars
  GATEWAY_TYMEOUT = "Gateway timeout",
  // eslint-disable-next-line no-unused-vars
  FORBIDDEN = "Forbidden",
}
