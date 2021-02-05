import React from "react";
import Container from "react-bootstrap/Container";

const Layout = (props) => {
  return (
    <>
      <h1 style={{ backgroundColor: "beige" }}>Header</h1>
      <Container fluid="md" className="container">
        {props.children}
      </Container>
      <h1 style={{ backgroundColor: "beige" }}>Footer</h1>
    </>
  );
};

export default Layout;
