import React from "react";
import { useTranslation } from "react-i18next";

import { FlexContainer } from "~src/UI";
import { IUserRepo } from "~components";

export const RepositoriesList: React.FC<IUserRepo> = ({ forks_count, id, html_url, name, stargazers_count }) => {
  const { t } = useTranslation();

  return (
    <>
      <FlexContainer key={id}>
        <div>
          <h3>
            <a href={html_url}>{name}</a>
          </h3>
        </div>

        <div>
          <p>
            {t("Forks")}: {forks_count}
          </p>
          <p>
            {t("Stars")}: {stargazers_count}
          </p>
        </div>
      </FlexContainer>
    </>
  );
};
