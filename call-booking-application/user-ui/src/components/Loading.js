import React from "react";
import { Spinner } from "react-bootstrap";

function Loading({ size = 100, className }) {
  return (
    <div className={className}>
      <Spinner
        style={{
          width: size,
          height: size,
        }}
        animation="border"
      />
    </div>
  );
}

export default Loading;