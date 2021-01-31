import React, { useState } from "react";

function Form(props) {
  let [firstname, setFirstname] = useState("");
  let [lastname, setLastname] = useState("");

  const handleChange = event => {
    switch (event.target.name) {
      case "firstname":
        setFirstname(event.target.value);
        break;
      case "lastname":
        setLastname(event.target.value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = event => {
    event.preventDefault();

    const newStudent = { firstname, lastname };

    props.onSubmit(newStudent);

    setFirstname("");
    setLastname("");
  };

  return (
    <div className="Form">
      <h3>Add a Student:</h3>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            type="text"
            name="firstname"
            value={firstname}
            onChange={handleChange}
          />
        </label>

        <label>
          Last Name:
          <input
            type="text"
            name="lastname"
            value={lastname}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Form;
