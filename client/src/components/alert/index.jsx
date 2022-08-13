import React from "react";

const Alert = ({ description, show }) => {
  return (
    <>
      {show && (
        <div className="alert alert-danger " role="alert">
          {description}
        </div>
      )}
    </>
  );
};

export default Alert;
