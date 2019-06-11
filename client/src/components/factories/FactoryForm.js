import React from "react";
import { Field, reduxForm } from "redux-form";

class FactoryForm extends React.Component {
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div>{error}</div>
        </div>
      );
    }
  }

  renderInput = ({ input, placeholder, meta, type }) => {
    const className = `field ${meta.error && meta.touched ? "error" : ""}`;
    return (
      <div className={className}>
        <input
          {...input}
          placeholder={placeholder}
          autoComplete="off"
          type={type}
        />
        {this.renderError(meta)}
      </div>
    );
  };

  onSubmit = formValues => {
    this.props.onSubmit(formValues);
  };

  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className="ui form error"
      >
        <Field
          name="name"
          component={this.renderInput}
          placeholder="Factory name"
          type="text"
        />

        <Field
          name="length"
          component={this.renderInput}
          placeholder="Number of children"
          type="number"
        />

        <Field
          name="min"
          component={this.renderInput}
          placeholder="Minimum range"
          type="number"
        />

        <Field
          name="max"
          component={this.renderInput}
          placeholder="Maximum range"
          type="number"
        />

        <button className="ui right floated button">Submit</button>
      </form>
    );
  }
}

const validate = formValues => {
  const errors = {};

  if (!formValues.name) {
    errors.name = "Required";
  }

  if (!Number(formValues.length)) {
    errors.length = "Required";
  } else if (isNaN(Number(formValues.length))) {
    errors.length = "Must be a number";
  } else if (Number(formValues.length) < 0 || Number(formValues.length) > 15) {
    errors.length = "Up to 15 child nodes can be generated";
  }

  if (!Number(formValues.min)) {
    errors.min = "Required";
  }

  if (!Number(formValues.max)) {
    errors.max = "Required";
  }

  if (Number(formValues.max) < Number(formValues.min)) {
    errors.max = "Invalid range";
  }

  // add validation min and max

  return errors;
};

export default reduxForm({ form: "factoryForm", validate })(FactoryForm);
