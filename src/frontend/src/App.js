import React, { useState, useEffect } from "react";
import { getAllStudents } from "./utils/Client";
import Layout from "./components/Layout";
import Table from "antd/lib/table";
import Avatar from "antd/lib/avatar";
import Spin from "antd/lib/spin";
import "./App.css";

const App = () => {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setIsLoading(true);
        const response = await getAllStudents();
        setStudents(response);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const renderStudents = () => {
    const columns = [
      {
        title: "",
        key: "avatar",
        render: (text, student) => (
          <Avatar siza="large" style={{ backgroundColor: "#abdbe0" }}>
            {`${student.firstName
              .charAt(0)
              .toUpperCase()}${student.lastName.charAt(0).toUpperCase()}`}
          </Avatar>
        ),
      },
      {
        title: "Student Id",
        dataIndex: "studentId",
        key: "studentId",
      },
      {
        title: "First Name",
        dataIndex: "firstName",
        key: "firstName",
      },
      {
        title: "Last Name",
        dataIndex: "lastName",
        key: "lastName",
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
      },
      {
        title: "Gender",
        dataIndex: "gender",
        key: "gender",
      },
    ];

    return (
      <Table
        dataSource={students}
        columns={columns}
        rowKey="studentId"
        pagination={false}
      />
    );
  };

  return (
    <Layout>
      {isLoading && <Spin size="large" />}

      {students && students.length ? (
        renderStudents()
      ) : (
        <h1>No students found</h1>
      )}
    </Layout>
  );
};

export default App;
