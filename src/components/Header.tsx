import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const HeaderContainer = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;
`;

export const Header: React.FC = () => {
  const { t } = useTranslation();

  return (
    <HeaderContainer>
      <h1>{t("GitHubSearched")}</h1>
    </HeaderContainer>
  );
};
