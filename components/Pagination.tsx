"use client";
import { useEffect, useState } from "react";
import { PaginationStyles } from "./styles/styles";

interface PaginationProps {
  current?: number;
  maxPageNumber: number;
  pageLength: number;
  onPageChange: (page: number) => void;
}

function PaginationComponent({
  maxPageNumber,
  pageLength,
  onPageChange,
}: PaginationProps) {
  const [currentPage, setcurrentPage] = useState(1);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(maxPageNumber);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);
  const length = pageLength;
  const pages = Array.from({ length }, (_, index) => index + 1);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setcurrentPage(Number((event.target as HTMLButtonElement).value));
  };

  const handleNextbtn = () => {
    setcurrentPage(currentPage + 1);
    if (currentPage + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + maxPageNumber);
      setminPageNumberLimit(minPageNumberLimit + maxPageNumber);
    }
  };

  const handlePrevbtn = () => {
    setcurrentPage(currentPage - 1);
    if ((currentPage - 1) % maxPageNumber == 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - maxPageNumber);
      setminPageNumberLimit(minPageNumberLimit - maxPageNumber);
    }
  };
  
  useEffect(() => {
    onPageChange(currentPage);
  }, [currentPage]);

  const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <button
          key={number}
          value={number}
          onClick={handleClick}
          className={
            currentPage == number
              ? PaginationStyles.active
              : PaginationStyles.li
          }
        >
          {number}
        </button>
      );
    }
  });

  let pageIncrementBtn = null;
  if (pages.length > maxPageNumberLimit) {
    pageIncrementBtn = (
      <li className={PaginationStyles.li} onClick={handleNextbtn}>
        &hellip;
      </li>
    );
  }

  let pageDecrementBtn = null;
  if (minPageNumberLimit >= 1) {
    pageDecrementBtn = (
      <li className={PaginationStyles.li} onClick={handlePrevbtn}>
        &hellip;
      </li>
    );
  }

  return (
    <>
      <nav>
        <ul className={PaginationStyles.ul}>
          <button
            onClick={handlePrevbtn}
            disabled={currentPage == pages[0] ? true : false}
            className={`${PaginationStyles.prev} ${
              currentPage == pages[0]
                ? PaginationStyles.disabled
                : PaginationStyles.li
            }`}
          >
            Prev
          </button>

          {pageDecrementBtn}
          {renderPageNumbers}
          {pageIncrementBtn}

          <button
            onClick={handleNextbtn}
            disabled={currentPage == pages[pages.length - 1] ? true : false}
            className={`${PaginationStyles.next} ${
              currentPage == pages[pages.length - 1]
                ? PaginationStyles.disabled
                : PaginationStyles.li
            }`}
          >
            Next
          </button>
        </ul>
      </nav>
    </>
  );
}

export default PaginationComponent;
