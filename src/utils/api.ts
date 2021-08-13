import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, CancelToken } from "axios";
import { useCallback } from "react";

import { IDetailedData, IUserData, IUserRepo } from "~components";
import { throwCurrentErrorType } from "~utils";
import { useCancelToken } from "~src/hooks";

const getRequestConfig = (cancelToken: CancelToken): AxiosRequestConfig | undefined => {
  return {
    headers: { Authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}` },
    cancelToken,
  };
};

type UseCreateGETrequestType = { path: string };

export const useCreateGETrequest = ({ path }: UseCreateGETrequestType): (() => Promise<AxiosResponse | void>) => {
  const sourceToken = useCancelToken();

  return useCallback(async () => {
    try {
      const data = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}${path}`, getRequestConfig(sourceToken));

      return data;
    } catch (error) {
      throwCurrentErrorType(error as AxiosError);
    }
  }, [path, sourceToken]);
};

export const useSearchUsers = (searchValue: string): (() => Promise<IUserData[] | void>) => {
  const searchUsers = useCreateGETrequest({ path: `search/users?q=${searchValue}` });

  return async () => {
    const result = await searchUsers();

    if (result) return result.data.items;
  };
};

export const useGetDetailedUsersInfo = (nickname: string): (() => Promise<IDetailedData | void>) => {
  const getDetailedUsersInfo = useCreateGETrequest({ path: `users/${nickname}` });

  return async () => {
    const result = await getDetailedUsersInfo();

    if (result) return result.data;
  };
};

export const useGetUserRepo = (nickname: string): (() => Promise<IUserRepo[] | void>) => {
  const getUserRepo = useCreateGETrequest({ path: `users/${nickname}/repos` });

  return async () => {
    const result = await getUserRepo();

    if (result) return result.data;
  };
};
