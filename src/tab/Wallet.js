import styled from "styled-components";
import metamask from "./../assets/metamask.svg";
import { useQuery } from "react-query";
import { WalletCard } from "./../components";

const Wrapper = styled.div`
  padding-top: 2.2em;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 1.2em;
  text-align: center;
`;

const Button = styled.button`
  background: #2187d0;
  color: #f1f2f9;
  min-width: 6em;
  padding: 0.5em 0.75em;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  position: relative;
  margin-top: 10px;
`;

const Wallet = ({ provider, account, theme, loadAccount, tokens }) => {
  const walletProps = {
    tokens,
    provider,
    account,
    theme,
  };

  return (
    <Wrapper>
      {provider && account ? (
        <WalletCard {...walletProps} />
      ) : (
        <div>
          <img src={metamask} alt="metamask" />
          <h1>Metamask</h1>
          <Button onClick={() => loadAccount(provider)}>Connect Wallet</Button>
        </div>
      )}
    </Wrapper>
  );
};

export default Wallet;
