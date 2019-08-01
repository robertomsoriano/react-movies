import React from "react";

const SearchButton = ({ onSearchButtonClick }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
      }}
    >
      <button
        onClick={onSearchButtonClick}
        className="btn btn-muted btn-sm mb-2"
        size="sm"
        style={{ background: "#e27a3f" }}
      >
        <i className="fas fa-search" /> Search
      </button>
    </div>
  );
};

export default SearchButton;
