import React from "react";
import styled from "styled-components";
import { FaSort } from "react-icons/fa";
import { numberWithCommas } from "./../../utils";
import WNRG from "../../assets/WNRG.png";

const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
`;

const StyledTable = styled.table`
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
  margin-bottom: 2.2rem;
  

  th,
  td {
    padding: 10px;
    text-align: left;
    border: 1px solid #ddd;
    font-size: 17px;
  }

  th {
    font-weight: bold;
  }

  tr:nth-child(even) {
    color: ${(props) => (props.theme === "light" ? "#282c34" : "#ececec")};
    background-color: ${(props) =>
      props.theme === "light" ? "#ececec" : "#737373"};
      
  }

  img {
    width: 17px;
    height: 17px;
    margin-right 8px;
  }
  
`;

const SortIcon = styled(FaSort)`
  cursor: pointer;
`;

export const Table = ({
  tokens,
  handleSortByName,
  handleSortByPrice,
  theme,
}) => {
  return (
    <TableContainer>
      <StyledTable theme={theme}>
        <thead>
          <tr>
            <th>#</th>
            <th>
              Name Price (USD) <SortIcon onClick={handleSortByName} />
            </th>
            <th>Symbol</th>
            <th>
              Price (USD) <SortIcon onClick={handleSortByPrice} />
            </th>
          </tr>
        </thead>
        <tbody>
          {tokens?.map((token, index) => (
            <tr key={token.symbol}>
              <td>{++index}</td>
              <td>
                <img src={token.icon ? token.icon : WNRG} alt={token.icon} />
                {token.name}
              </td>
              <td>{token.symbol}</td>
              <td>${numberWithCommas(token.last_price?.toFixed(2))}</td>
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </TableContainer>
  );
};
