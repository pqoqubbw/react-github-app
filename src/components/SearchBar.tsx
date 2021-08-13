import React from "react";

import { StyledInput, FlexContainer } from "~src/UI";

interface ISearchBar {
  value: string;
  // eslint-disable-next-line no-unused-vars
  handleChange: (data: string) => void;
  placeholder: string;
}

export const SearchBar: React.FC<ISearchBar> = ({ handleChange, value, placeholder }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(e.target.value);
  };

  return (
    <FlexContainer>
      <StyledInput type="text" placeholder={placeholder} value={value} onChange={handleInputChange} />
    </FlexContainer>
  );
};

export default SearchBar;
