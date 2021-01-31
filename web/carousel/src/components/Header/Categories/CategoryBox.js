import React, { Component } from "react";
import classes from "./CategoryBox.module.css";
import { withRouter } from "react-router-dom";

class CategoryBox extends Component {
  handleClick() {
    this.props.history.push("/search?category=" + this.props.category);
    window.location.reload();
  }
  render() {
    console.log(this.props.category);

    return (
      <div className={classes.Box} onClick={() => this.handleClick()}>
        <p>{this.props.category}</p>
      </div>
    );
  }
}

export default withRouter(CategoryBox);
