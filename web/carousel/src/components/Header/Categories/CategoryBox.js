import React, { Component } from "react";
import classes from "./CategoryBox.module.css";
import { withRouter } from "react-router-dom";

class CategoryBox extends Component {
  handleClick() {
    this.props.history.push("/search?query=" + this.props.category);
  }
  render() {
    return (
      <div className={classes.Box} onClick={() => this.handleClick()}>
        <p>{this.props.category}</p>
      </div>
    );
  }
}

export default withRouter(CategoryBox);
