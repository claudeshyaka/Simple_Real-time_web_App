import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import socket from "./Socket";
import { getRootName } from "../actions";

class Header extends React.Component {
  componentDidMount() {
    this.props.getRootName(socket);
  }

  //TODO: Add functionality for Delete All
  render() {
    return (
      <div className="ui secondary pointing menu">
        <Link to="/" className="item">
          <h2>{this.props.root.name}</h2>
        </Link>
        <div className="right menu">
          <div className="item">
            <Link to="/" className="ui button">
              Delete All
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { root: state.root };
};

export default connect(
  mapStateToProps,
  { getRootName }
)(Header);
