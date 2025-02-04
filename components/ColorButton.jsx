import React from "react";

const ColorButton = ({ color, handleClick }) => {
  return (
    <button
      className="color-button"
      data-testid="colorOption"
      onClick={() => handleClick(color)}
      style={{
        backgroundColor: color,
        width: "80px",
        height: "80px",
        margin: "5px",
        border: "none",
        cursor: "pointer",
      }}
    ></button>
  );
};

export default ColorButton;