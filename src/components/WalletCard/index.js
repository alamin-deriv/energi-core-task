import React from "react";
import styled from "styled-components";
import networks from "./../../networks.json";
import { BsRecordCircle } from "react-icons/bs";
import { HiOutlineExternalLink } from "react-icons/hi";
import { numberWithCommas } from "./../../utils";

const WalletContainer = styled.div`
  width: 30%;
`;

const WalletHeader = styled.div`
  background: ${(props) => (props.theme === "light" ? "#121a29" : "#737373")};
  display: flex;
  align-items: center;

  transform: translate(0, -50%);
  color: white;
  margin-top: 20px;

  width: 400px;
  height: 48px;

  border-radius: 10px;

  & p {
    margin: 0 auto;
  }

  & a {
    display: flex;
    justify-content: center;
    align-items: center;

    background: #222d41;
    border: none;
    color: white;

    margin: 0;
    border-radius: 10px;

    width: 182px;
    height: 48px;

    font-size: 20px;
    font-weight: bold;
    text-decoration: none;

    transition: all 250ms ease;
  }
`;

const BalanceWrapper = styled.div`
  width: 400px;
  margin-top: 10px;
  background: ${(props) => (props.theme === "light" ? "#121a29" : "#737373")};
  height: 300px;
  border-radius: 10px;
  color: white;

  & small {
    float: right;
    margin: 2px 10px 50px 0;
    color: #04d94f;
  }

  & p {
    clear: both;
  }
`;

export const WalletCard = ({ tokens, account, theme }) => {
  const currentToken =
    tokens.length &&
    tokens.filter((token) => token.symbol === networks[account.chainId].symbol)[0];

  const usdprice = Number(account.balance) * currentToken?.last_price || 0;
  return (
    <WalletContainer>
      <WalletHeader theme={theme}>
        <p>{networks[account.chainId].name}</p>
        <a
          href={`${networks[account.chainId].explorer_url}/address/${
            account.address
          }`}
          target="_blank"
          rel="noreferrer"
        >
          {account.address.slice(0, 5) + "..." + account.address.slice(38, 42)}{" "}
          <HiOutlineExternalLink />
        </a>
      </WalletHeader>
      <BalanceWrapper theme={theme}>
        <small>
          <BsRecordCircle /> connected
        </small>
        <p>Total Balance:</p>
        <h2>
          {numberWithCommas(Number(account.balance).toFixed(3))}{" "}
          {networks[account.chainId].symbol}
        </h2>
        <h2>{numberWithCommas(Number(usdprice).toFixed(2))} USD</h2>
      </BalanceWrapper>
    </WalletContainer>
  );
};
