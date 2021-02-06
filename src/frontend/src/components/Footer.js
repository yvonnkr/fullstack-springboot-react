import React from "react";
import Avatar from "antd/lib/avatar";
import Button from "antd/lib/button";
import Container from "./Container";

const Footer = ({ numberOfStudents, handleAddStudentClickEvent }) => {
  return (
    <div className="footer">
      <Container>
        {numberOfStudents !== undefined ? (
          <Avatar
            style={{ backgroundColor: "#abdbe0", marginRight: "8px" }}
            size="large"
          >
            {numberOfStudents}
          </Avatar>
        ) : null}

        <Button onClick={() => handleAddStudentClickEvent()} type="default">
          Add new student +
        </Button>
      </Container>
    </div>
  );
};

export default Footer;
