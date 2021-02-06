import React from "react";
import ReactBootstrapContainer from "react-bootstrap/Container";

const Container = (props) => {
  return (
    <ReactBootstrapContainer fluid="md" className="container">
      {props.children}
    </ReactBootstrapContainer>
  );
};

export default Container;
