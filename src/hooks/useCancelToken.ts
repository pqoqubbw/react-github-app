import axios, { CancelToken } from "axios";
import { useEffect } from "react";

import { USER_LEFT_THE_PAGE } from "~src/utils";

export const useCancelToken = (): CancelToken => {
  const source = axios.CancelToken.source();

  useEffect(() => {
    return () => {
      source.cancel(USER_LEFT_THE_PAGE);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return source.token;
};
