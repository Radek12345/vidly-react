import React, { Component } from "react";

const Like = props => {
  let classes = "fa fa-heart";

  if (!props.isLiked) classes += "-o";

  return (
    <i
      className={classes}
      aria-hidden="true"
      style={{ cursor: "pointer" }}
      onClick={props.onLike}
    />
  );
};

export default Like;