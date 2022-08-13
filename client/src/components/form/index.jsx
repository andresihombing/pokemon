import React, { useState } from "react";

const Form = ({ handleSubmit }) => {
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  return (
    <>
      <div class="mt-5 mb-2 was-validated">
        <input
          type="text"
          name="nickname"
          class="form-control"
          placeholder="enter nickname"
          required
          onChange={handleChange}
        />
      </div>
      <button
        type="submit"
        class="btn btn-primary btn-sm float-end"
        onClick={() => handleSubmit(inputs)}
      >
        Submit
      </button>
    </>
  );
};

export default Form;
