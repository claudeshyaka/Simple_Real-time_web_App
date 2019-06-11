import React from "react";
import { connect } from "react-redux";

import socket from "../Socket";
import { getFactory } from "../../actions";

class FactoryDetail extends React.Component {
  componentDidMount() {
    const { _id } = this.props.match.params;
    this.props.getFactory(socket, _id);
  }

  componentWillUnmount() {
    socket.disconnect();
  }

  renderList(childNodes) {
    return childNodes.map(child => {
      return (
        <div
          className="item"
          key={this.props.factory.childNodes.indexOf(child)}
        >
          <i className="large middle aligned angle right icon" />
          <div className="content">
            <div className="header">{child.value}</div>
          </div>
        </div>
      );
    });
  }

  render() {
    if (!this.props.factory) {
      return <div>Loading...</div>;
    }

    const { name, length, min, max, childNodes } = this.props.factory;

    return (
      <div className="content">
        <h3 className="header">{name}</h3>
        <div className="description">
          <div className="ui horizontal divided list">
            <div className="item">
              <div className="content">
                <h5>Number of nodes: {length}</h5>
              </div>
            </div>
            <div className="item">
              <div className="content">
                <h5>Minimum range: {min}</h5>
              </div>
            </div>
            <div className="item">
              <div className="content">
                <h5>Maximum range: {max}</h5>
              </div>
            </div>
          </div>
        </div>

        <div className="ui celled list">{this.renderList(childNodes)}</div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { factory: state.factories[ownProps.match.params._id] };
};

export default connect(
  mapStateToProps,
  { getFactory }
)(FactoryDetail);
