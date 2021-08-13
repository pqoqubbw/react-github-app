import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useParams } from "react-router";

import { Loader, RepositoriesList, SearchBar } from "~components";
import { StyledAvatar, FlexContainer, StyledButton, StyledParagrafBio } from "~src/UI";
import { getUTCDate, isThereAnyData, useGetDetailedUsersInfo, useGetUserRepo } from "~utils";
import { useHandleError } from "~src/hooks";

interface IUseParams {
  nickname: string;
}

export interface IDetailedData {
  avatar_url: string;
  login: string;
  email: string;
  name: string;
  location: string;
  created_at: string;
  followers: number;
  following: number;
  bio: string;
  repos_url: string;
}

export interface IUserRepo {
  id: number;
  html_url: string;
  name: string;
  forks_count: number;
  stargazers_count: number;
}

export const UserDetailedInfo: React.FC = () => {
  const { t } = useTranslation();
  const { nickname } = useParams<IUseParams>();
  const history = useHistory();
  const getDetailedUsersInfo = useGetDetailedUsersInfo(nickname);
  const getUserRepo = useGetUserRepo(nickname);
  const [detailedData, setDetailedData] = useState<IDetailedData>({} as IDetailedData);
  const [usersRepo, setUsersRepo] = useState<IUserRepo[]>([] as IUserRepo[]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const errorTypeHandling = useHandleError();

  const getFilterRepo = useCallback(
    (): IUserRepo[] =>
      usersRepo.filter((item) => item.name.trim().toLowerCase().includes(searchValue.trim().toLowerCase())),
    [searchValue, usersRepo]
  );

  const getUsersInfo = useCallback(async () => {
    try {
      const result = await getDetailedUsersInfo();
      const userRepo = await getUserRepo();

      if (result && userRepo) {
        setDetailedData(result);
        setUsersRepo(userRepo);
      }
    } catch (e) {
      errorTypeHandling({ errorMessage: e.mesage, defaultErrorText: t("ErrorInUserDetailedInfo") });
    } finally {
      setIsLoading(false);
    }
  }, [errorTypeHandling, getDetailedUsersInfo, getUserRepo, t]);

  useEffect(() => {
    getUsersInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleButtonClick = useCallback(() => {
    history.goBack();
  }, [history]);

  return (
    <>
      {isLoading ? (
        <div>
          <Loader />
        </div>
      ) : (
        <>
          <StyledButton onClick={handleButtonClick}>{t("GoBackButton")}</StyledButton>
          <FlexContainer>
            <div>
              <StyledAvatar src={detailedData.avatar_url} alt={detailedData.login} />
            </div>
            <div>
              <h2>{detailedData.name || detailedData.login}</h2>
            </div>
            <div>
              <p>
                {t("Email")}: {isThereAnyData(detailedData.email)}
              </p>
              <p>
                {t("Location")}: {isThereAnyData(detailedData.location)}
              </p>
              <p>
                {t("Created_at")}: {getUTCDate(detailedData.created_at)}
              </p>
              <p>
                {t("Followers")}: {detailedData.followers || 0}
              </p>
              <p>
                {t("Following")}: {detailedData.following || 0}
              </p>
              <div>
                {t("Bio")}: <StyledParagrafBio>{isThereAnyData(detailedData.bio)}</StyledParagrafBio>
              </div>
            </div>
          </FlexContainer>
          <SearchBar value={searchValue} handleChange={setSearchValue} placeholder={t("UsersRepoPlaceholder")} />
          {getFilterRepo().map((repo) => (
            <RepositoriesList key={repo.id} {...repo} />
          ))}
        </>
      )}
    </>
  );
};
