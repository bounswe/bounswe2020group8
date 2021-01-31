import React, { Component } from "react";
import classes from "./Categories.module.css";

import CategoryBox from "./CategoryBox";

class Categories extends Component {
  render() {
    return (
      <div className={classes.Categories}>
        {this.props.categories &&
          this.props.categories.map((category, key) => {
            return <CategoryBox key={key} category={category.name} />;
          })}
      </div>
    );
  }
}

export default Categories;
