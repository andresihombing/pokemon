import React from "react";

const Error = ({ errorMessage }) => {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <>
      <h1 className="text-center"> {errorMessage} </h1>
      <p className="text-center">Check your connection</p>
      <div className="text-center">
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={() => handleRefresh()}
        >
          Refresh
        </button>
      </div>
    </>
  );
};

export default Error;
