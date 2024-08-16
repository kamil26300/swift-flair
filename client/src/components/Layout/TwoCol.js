import React from "react";

const TwoCol = (props) => {
  return (
    <div className="flex flex-col lg:grid grid-cols-2 w-10/12 gap-12">
      {props.children}
    </div>
  );
};

export default TwoCol;
