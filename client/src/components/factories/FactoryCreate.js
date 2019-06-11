import React from "react";
import { connect } from "react-redux";
import FactoryForm from "./FactoryForm";

import socket from "../Socket";
import { createFactory } from "../../actions";

class FactoryCreate extends React.Component {
  onSubmit = formProps => {
    this.props.createFactory(socket, formProps);
  };

  render() {
    return (
      <div>
        <h3>Create a Factory</h3>
        <FactoryForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

export default connect(
  null,
  { createFactory }
)(FactoryCreate);
