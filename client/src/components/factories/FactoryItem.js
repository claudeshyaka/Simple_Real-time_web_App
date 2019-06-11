import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";

import socket from "../Socket";
import { getFactory, editFactory } from "../../actions";
import ChildList from "../ChildList";

class FactoryItem extends React.Component {
  componentDidMount() {
    this.props.getFactory(socket, this.props._id);
  }

  // TODO: implement onButtonClicks
  //        Connect sockets
  //        Add validation

  onSubmit = formaValues => {
    console.log(formaValues);
  };

  render() {
    return (
      <div className="four wide column">
        <div className="ui segment">
          <div className="ui form">
            <div className="field">
              <input
                type="text"
                placeholder="Factory name"
                value={this.props.name}
              />
            </div>
          </div>

          <div className="ui clearing divider" />

          <div className="ui form">
            <div className="field">
              <input
                type="number"
                placeholder="Number of nodes"
                value={this.props.length}
                // onChange={e => this.setState({ length: e.target.value })}
              />
            </div>

            <div className="equal width fields">
              <div className="field">
                <input
                  type="number"
                  placeholder="Min"
                  value={this.props.min}
                  // onChange={e => this.setState({ min: e.target.value })}
                />
              </div>

              <div className="field">
                <input
                  type="number"
                  placeholder="Max"
                  value={this.props.max}
                  // onChange={e => this.setState({ max: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="ui clearing divider" />

          {/* <ChildList children={this.props.childNodes} /> */}

          <div className="ui clearing divider" />

          <button
            // onClick={() => this.onSaveButtonClick(this.state)}
            className="ui primary button"
          >
            Save
          </button>
          <button
            className="ui button"
            // onClick={() => this.onDiscardButtonClick(this.state.id)}
          >
            Discard
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { factory: state.factories[ownProps._id] };
};

export default connect(
  mapStateToProps,
  { getFactory }
)(FactoryItem);
