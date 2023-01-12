import { RiSunFill, RiMoonFill } from "react-icons/ri";
import styled from "styled-components";

const Wrapper = styled.div`
  padding-top: 2.2em;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 1.2em;
`;

const Tabs = styled.div`
  background: #0d121d;
  border-radius: 10px;
  padding: 0.2em;
`;

const Tab = styled.button`
  background: ${(props) => (props.active ? "#2187D0" : "transparent")};
  color: #f1f2f9;
  min-width: 6em;
  padding: 0.5em 0.75em;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  position: relative;
`;

const ThemeToggleButton = styled.button`
  cursor: pointer;
  padding: 0.5rem 0.6rem;
  border: none;
  color: ${(props) => (props.theme === "light" ? "black" : "white")};
  background: none;
  border-radius: 10px;
`;

export const Header = ({ toggleTheme, theme, setTab, tab }) => {
  return (
    <Wrapper>
      <Tabs>
        <Tab
          onClick={() => setTab("Home")}
          active={tab === "Home" ? true : false}
        >
          Home
        </Tab>
        <Tab
          onClick={() => setTab("Wallet")}
          active={tab === "Wallet" ? true : false}
        >
          Wallet
        </Tab>
      </Tabs>
      <ThemeToggleButton theme={theme} onClick={toggleTheme}>
        {theme === "light" ? <RiMoonFill /> : <RiSunFill />}
      </ThemeToggleButton>
    </Wrapper>
  );
};
