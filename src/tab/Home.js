import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ReactPaginate from "react-paginate";
import { EmptyState, Loader, Table } from "./../components";



const Wrapper = styled.div`
  padding: 2.2em;
  width: 70%;
  margin: 0 auto;
`;

const Home = ({ isLoading, error, theme, tokens }) => {
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  const itemsPerPage = 20;

  const [priceSorted, setPriceSorted] = useState(false);
  const [nameSorted, setNameSorted] = useState(false);

  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;

    setCurrentItems(tokens.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(tokens.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, tokens]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % tokens.length;
    setItemOffset(newOffset);
  };

  const handleSortByName = () => {
    if (nameSorted) {
      const sortedList = currentItems.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
      setNameSorted(!nameSorted);
      setCurrentItems(sortedList);
    } else {
      const sortedList = currentItems.sort((a, b) => {
        if (b.name < a.name) {
          return -1;
        }
        if (b.name > a.name) {
          return 1;
        }
        return 0;
      });
      setNameSorted(!nameSorted);
      setCurrentItems(sortedList);
    }
  };

  const handleSortByPrice = () => {
    const sortedList = priceSorted
      ? currentItems.sort((a, b) => a.last_price - b.last_price)
      : currentItems.sort((a, b) => b.last_price - a.last_price);

    setCurrentItems(sortedList);
    setPriceSorted(!priceSorted);
  };

  if (isLoading) return <Loader />;

  if (error || !currentItems?.length) return <EmptyState />;

  const tableProps = {
    handleSortByName,
    handleSortByPrice,
    tokens: currentItems,
    theme,
  };

  return (
    <Wrapper>
      <Table {...tableProps} />
      <ReactPaginate
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel="<"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
    </Wrapper>
  );
};

export default Home;
