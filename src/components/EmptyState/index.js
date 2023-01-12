import React from "react";
import styled from "styled-components";
import Empty from "../../assets/emptyState.png";

const StyledDiv = styled.div`
  text-align: center;
  width: 36%;
  margin: 100px auto;
  & h3 {
    font-weight: bold;
    font-size: 24px;
    line-height: 28px;
  }
  & h4 {
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;
    margin-top: 16px;
  }

  & img {
    margin-top: 30px;
  }
`;

export const EmptyState = () => {
  return (
    <StyledDiv>
      <h3>Error Acquire</h3>
      <h4>Something went wrong, please try again.</h4>
      <img src={Empty} alt="empty state" height="170px" />
    </StyledDiv>
  );
};
