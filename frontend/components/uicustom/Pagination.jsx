import React, { useState } from "react";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const [prevClicked, setPrevClicked] = useState(false);
  const [nextClicked, setNextClicked] = useState(false);

  const handlePageClick = (pageNumber) => {
    onPageChange(pageNumber);
  };

  const handlePrevClick = () => {
    setPrevClicked(true);
    handlePageClick(currentPage - 1);

    setTimeout(() => {
      setPrevClicked(false);
    }, 1000);
  };

  const handleNextClick = () => {
    setNextClicked(true);
    handlePageClick(currentPage + 1);

    setTimeout(() => {
      setNextClicked(false);
    }, 1000);
  };

  const PageButton = ({ index }) => (
    <button
      onClick={() => handlePageClick(index)}
      className={`mx-3 ${index === currentPage ? "font-bold" : ""}`}
      disabled={index === currentPage}
    >
      {index + 1}
    </button>
  );

  return (
    <div className="text-black font-titleTextType flex justify-between items-center mt-4 h-10 w-full bg-[#e7c141]">
      <button
        onClick={handlePrevClick}
        disabled={currentPage === 0}
        className={`relative ml-32 transition-transform duration-1000 transform ${
          prevClicked ? "-translate-x-14" : ""
        }`}
      >
        <GrLinkPrevious className="h-5 w-5" />
      </button>

      <div className="font-titleTextType">
        {Array.from({ length: totalPages }, (_, index) => (
          <PageButton key={index} index={index} />
        ))}
      </div>

      <button
        onClick={handleNextClick}
        disabled={currentPage >= totalPages - 1}
        className={`relative mr-32 transition-transform duration-1000 transform ${
          nextClicked ? "translate-x-14" : ""
        }`}
      >
        <GrLinkNext className="h-5 w-5" />
      </button>
    </div>
  );
};

export default Pagination;
// Sayfa {currentPage + 1} / {totalPages}
