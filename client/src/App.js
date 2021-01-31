import React, { useEffect, useState } from "react";
import Form from "./components/form";
import "./App.css";

export default function App() {
  let [students, setStudents] = useState([]);

  useEffect(() => {
    getStudents();
  }, []);

  const getStudents = () => {
    fetch("/students")
      .then(response => response.json())
      .then(students => {
        setStudents(students);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const addStudent = newStudent => {
    fetch("/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newStudent)
    })
      // Continue fetch request here
      .then(response => response.json())
      .then(students => {
        setStudents(students);
      })
      .catch(error => console.log("error:", error.message));
  };

  const deleteStudent = id => {
    let options = {
      method: "DELETE"
    };

    fetch(`/students/${id}`, options)
      .then(result => result.json())
      .then(students => {
        setStudents(students);
      })
      .catch(err => {
        console.log("error!", err.message);
      });
  };

  const featureStudent = student => {
    console.log(student);
    let id = student.id;

    let options = {
      method: "GET"
    };

    fetch(`/students/${id}`, options)
      .then(result => result.json())
      // .then(students => {
      //   setStudents(students);
      // })
      .catch(err => {
        console.log("error!", err.message);
      });
  };

  return (
    <div className="App">
      <h1>CodeOp's Facebook</h1>

      <div className="List">
        <h2>Students</h2>
        <ul>
          {students.map(student => (
            <li key={student.id} onClick={e => featureStudent(student)}>
              {student.firstname} {student.lastname}
              <div>
                <button onClick={e => deleteStudent(student.id)} type="button">
                  delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <Form onSubmit={newStudent => addStudent(newStudent)} />
    </div>
  );
}
