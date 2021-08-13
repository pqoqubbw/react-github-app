import React from "react";
import { useTranslation } from "react-i18next";

import { IUserData } from "~components";
import { StyledContainer, StyledLink, StyledAvatar } from "~src/UI";

interface IUserListProps {
  userData: IUserData[];
}

export const UserList: React.FC<IUserListProps> = ({ userData }) => {
  const { t } = useTranslation();

  return (
    <>
      {!userData.length ? (
        <h2>{t("NoUsers")}</h2>
      ) : (
        userData.map((user) => (
          <StyledContainer key={user.id}>
            <div>
              <StyledAvatar src={user.avatar_url} alt={user.login} />
            </div>
            <div>
              <h3>
                <StyledLink to={user.login}>{user.login}</StyledLink>
              </h3>
            </div>
          </StyledContainer>
        ))
      )}
    </>
  );
};
