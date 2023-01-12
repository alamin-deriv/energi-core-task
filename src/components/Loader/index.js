import React from "react";
import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const LoaderWrapper = styled.div`
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #2187d0;
  width: 120px;
  height: 120px;
  margin: 0 auto;
  margin-top: 250px;
  animation: ${spin} 2s linear infinite;
`;

export const Loader = () => {
  return <LoaderWrapper data-testid="loader"></LoaderWrapper>;
};
