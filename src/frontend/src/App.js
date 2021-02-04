import React, { useState, useEffect } from "react";
import "./App.css";
import { getAllStudents } from "./utils/Client";

const App = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await getAllStudents();
        console.log(response);
        setStudents(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchStudents();
  }, []);

  return (
    <>
      {students && students.length ? (
        students.map(({ studentId, firstName, lastName, email, gender }) => (
          <div key={studentId}>
            <h2>{studentId}</h2>
            <p>{firstName}</p>
            <p>{lastName}</p>
            <p>{gender}</p>
            <p>{email}</p>
          </div>
        ))
      ) : (
        <h1>No Students Found</h1>
      )}
    </>
  );
};

export default App;
