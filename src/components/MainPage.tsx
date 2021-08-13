import React, { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

import { Loader, UserList, SearchBar } from "~components";
import { SEARCH_VALUE_STORAGE, USER_DATA_STORAGE, useSearchUsers } from "~utils";
import { useHandleError, useLocalStorage } from "~src/hooks";

const StyledMainContainer = styled.div`
  display: flex;
  margin-top: 7%;
  margin-bottom: 7%;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  align-items: center;
`;

export interface IUserData {
  avatar_url: string;
  id: number;
  login: string;
}

export const MainPage: React.FC = () => {
  const { t } = useTranslation();
  const [searchValueStorage, setSearchValueStorage] = useLocalStorage(SEARCH_VALUE_STORAGE, "");
  const [userDataStorage, setUserDataStorage] = useLocalStorage<IUserData[]>(USER_DATA_STORAGE, [] as IUserData[]);
  const [userData, setUserData] = useState<IUserData[]>(userDataStorage);
  const [searchValue, setSearchValue] = useState(searchValueStorage);
  const [isLoading, setIsLoading] = useState(false);
  const searUsers = useSearchUsers(searchValue);
  const errorTypeHandling = useHandleError();

  const getSearchUsers = useCallback(async () => {
    setIsLoading(true);

    try {
      const result = await searUsers();

      if (result) {
        setUserData(result);
        setUserDataStorage(result);
      }
    } catch (e) {
      errorTypeHandling({ errorMessage: e.mesage, defaultErrorText: t("ErrorInMainPage") });
    } finally {
      setIsLoading(false);
    }
  }, [errorTypeHandling, searUsers, setUserDataStorage, t]);

  useEffect(() => {
    if (searchValue.trim()) {
      getSearchUsers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  const handleChange = useCallback(
    (data: string) => {
      setSearchValue(data);
      setSearchValueStorage(data);
    },
    [setSearchValueStorage]
  );

  return (
    <StyledMainContainer>
      <SearchBar value={searchValue} handleChange={handleChange} placeholder={t("SearchPlaceholderForUsers")} />
      <div>{!isLoading ? <UserList userData={userData} /> : <Loader />}</div>
    </StyledMainContainer>
  );
};
