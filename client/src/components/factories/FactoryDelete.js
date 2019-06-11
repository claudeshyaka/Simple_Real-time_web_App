import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Modal from "../Modal";
import history from "../../history";
import socket from "../Socket";
import { getFactory, deleteFactory } from "../../actions";

class FactoryDelete extends React.Component {
  componentDidMount() {
    this.props.getFactory(socket, this.props.match.params._id);
  }

  renderActions() {
    const { _id } = this.props.match.params;

    return (
      <React.Fragment>
        <button
          onClick={() => this.props.deleteFactory(socket, _id)}
          className="ui button negative"
        >
          Delete
        </button>
        <Link to="/" className="ui button">
          Cancel
        </Link>
      </React.Fragment>
    );
  }

  renderContent() {
    if (!this.props.factory) {
      return "Are you sure you want to delete this factory?";
    }

    return `Are you sure you want to delete the factory with name: ${
      this.props.factory.name
    }`;
  }

  render() {
    return (
      <Modal
        title="Delete Factory"
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => history.push("/")}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { factory: state.factories[ownProps.match.params._id] };
};

export default connect(
  mapStateToProps,
  { getFactory, deleteFactory }
)(FactoryDelete);
