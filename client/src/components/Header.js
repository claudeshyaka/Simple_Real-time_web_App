import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import socket from "./Socket";
import { getRootName } from "../actions";

class Header extends React.Component {
  componentDidMount() {
    this.props.getRootName(socket);
  }

  render() {
    return (
      <div className="ui secondary pointing menu">
        <Link to="/" className="item">
          <h2>{this.props.root.name}</h2>
        </Link>
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
