import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { ethers } from "ethers";
import styled from "styled-components";
import { Header } from "./components";
import Home from "./tab/Home";
import Wallet from "./tab/Wallet";
import { handleIcons } from "./utils";


const icons = handleIcons(
  require.context("./assets/icons", false, /\.(svg)$/)
);

const AppContainer = styled.div`
  background-color: ${(props) =>
    props.theme === "light" ? "#F1F2F9" : "#282c34"};
  color: ${(props) => (props.theme === "light" ? "#282c34" : "#F1F2F9")};
  min-height: 100vh;
`;

const App = () => {
  const [theme, setTheme] = useState("light");
  const [tab, setTab] = useState("Home");
  const [tokens, setTokens] = useState([]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };


  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);

  const loadBlockchainData = async () => {
    // Connect Ethers to blockchain
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    setProvider(provider);
    // Reload page when network changes
    window.ethereum.on("chainChanged", () => {
      window.location.reload();
    });

    // Fetch current account & balance from Metamask when changed
    window.ethereum.on("accountsChanged", () => {
      loadAccount(provider);
    });
  };

  const loadAccount = async (provider) => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const address = ethers.utils.getAddress(accounts[0]);

    const network = await provider.getNetwork();

    let balance = await provider.getBalance(address);
    balance = ethers.utils.formatEther(balance);

    setAccount({ ...network, balance, address });
  };

  useEffect(() => {
    loadBlockchainData();
  }, []);

  // fetch list of tokens
  const { isLoading, error, data } = useQuery("tokens", () =>
    fetch("https://api.energiswap.exchange/v1/assets").then((res) => res.json())
  );

  useEffect(() => {
    if (data) {
      let list = [];
      for (let [, value] of Object.entries(data)) {
        list.push({
          ...value,
          icon: icons[`${value.symbol}.svg`],
        });
      }

      setTokens(list);
    }
  }, [data]);


  const walletProps = {
    provider,
    account,
    theme,
    loadAccount,
    tokens,
  };

  const homeProps = {
    isLoading,
    error,
    theme,
    tokens,
  };


  const headerProps = {
    toggleTheme,
    theme,
    setTab,
    tab,
  };

  return (
    <AppContainer data-testid="app-container" theme={theme}>
      <Header {...headerProps} />
      {tab === "Home" ? <Home {...homeProps} /> : <Wallet {...walletProps} />}
    </AppContainer>
  );
};

export default App;
