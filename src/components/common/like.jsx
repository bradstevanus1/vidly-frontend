import React from "react";

function Like({ liked, onClick }) {
  let className = "fa fa-heart";
  if (!liked) className += "-o";
  return (
    <i
      onClick={onClick}
      style={{ cursor: "pointer" }}
      className={className}
      aria-hidden="true"
    ></i>
  );
}

export default Like;
