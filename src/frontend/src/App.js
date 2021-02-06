import React, { useState, useEffect } from "react";
import { getAllStudents } from "./utils/Client";
import Table from "antd/lib/table";
import Avatar from "antd/lib/avatar";
import Spin from "antd/lib/spin";
import Empty from "antd/lib/empty";
import Modal from "antd/lib/modal";
import Container from "./components/Container";
import Footer from "./components/Footer";
import "./App.css";

const App = () => {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddStudentModalVisisble, setIsAddStudentModalVisisble] = useState(
    false
  );

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

  const openAddStudentModal = () => setIsAddStudentModalVisisble(true);

  const closeAddStudentModal = () => setIsAddStudentModalVisisble(false);

  const commonElements = () => (
    <div>
      <Modal
        title="Add new student"
        visible={isAddStudentModalVisisble}
        onOk={closeAddStudentModal}
        onCancel={closeAddStudentModal}
        width={1000}
      >
        <h3>TODO: Add Form</h3>
      </Modal>

      <Footer
        numberOfStudents={students ? students.length : 0}
        handleAddStudentClickEvent={openAddStudentModal}
      />
    </div>
  );

  // render spinner
  if (isLoading) {
    return (
      <Container>
        <Spin size="large" />
      </Container>
    );
  }

  // render students
  if (students && students.length) {
    const columns = [
      {
        title: "",
        key: "avatar",
        render: (text, student) => (
          <Avatar size="large" style={{ backgroundColor: "#abdbe0" }}>
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
      <Container>
        <Table
          dataSource={students}
          columns={columns}
          rowKey="studentId"
          pagination={false}
        />

        {commonElements()}
      </Container>
    );
  }

  // default render
  return (
    <Container>
      <Empty description={<h1>No Students found</h1>} />

      {commonElements()}
    </Container>
  );
};

export default App;
