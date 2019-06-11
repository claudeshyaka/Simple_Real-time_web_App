import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getFactories } from "../../actions";
import socket from "../Socket";

class FactoryList extends React.Component {
  componentDidMount() {
    this.props.getFactories(socket);
  }

  renderUserButton(factory) {
    return (
      <div className="right floated content">
        <Link
          to={`/factories/edit/${factory._id}`}
          className="ui button primary"
        >
          Edit
        </Link>
        <Link
          to={`/factories/delete/${factory._id}`}
          className="ui button negative"
        >
          Delete
        </Link>
      </div>
    );
  }

  renderList() {
    return this.props.factories.map(factory => {
      return (
        <div className="item" key={factory._id}>
          {this.renderUserButton(factory)}
          <i className="large middle aligned angle right icon" />
          <div className="content">
            <Link to={`/factories/${factory._id}`} className="header">
              {factory.name}
            </Link>
            <div className="description">
              <div className="ui horizontal divided list">
                <div className="item">
                  <div className="content">
                    Number of child nodes: {factory.length}
                  </div>
                </div>
                <div className="item">
                  <div className="content">Minimum range: {factory.min}</div>
                </div>
                <div className="item">
                  <div className="content">Maximum range: {factory.max}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  }

  renderCreate() {
    return (
      <div style={{ textAlign: "right" }}>
        <Link to="/factory/new" className="ui button primary">
          Create Factory
        </Link>
      </div>
    );
  }

  render() {
    return (
      <div>
        <h3>Factories</h3>
        <div className="ui celled list">{this.renderList()}</div>
        {this.renderCreate()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { factories: Object.values(state.factories) };
};

export default connect(
  mapStateToProps,
  { getFactories }
)(FactoryList);
