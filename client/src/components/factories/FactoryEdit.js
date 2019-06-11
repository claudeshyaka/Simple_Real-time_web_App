import _ from "lodash";
import React from "react";
import { connect } from "react-redux";

import socket from "../Socket";
import { getFactory, editFactory } from "../../actions";
import FactoryForm from "./FactoryForm";

class FactoryEdit extends React.Component {
  componentDidMount() {
    this.props.getFactory(socket, this.props.match.params._id);
  }

  onSubmit = formValues => {
    this.props.editFactory(socket, this.props.match.params._id, formValues);
  };

  render() {
    if (!this.props.factory) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <h3>Edit a Factory</h3>
        <FactoryForm
          initialValues={_.pick(
            this.props.factory,
            "name",
            "length",
            "min",
            "max"
          )}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { factory: state.factories[ownProps.match.params._id] };
};

export default connect(
  mapStateToProps,
  { getFactory, editFactory }
)(FactoryEdit);
