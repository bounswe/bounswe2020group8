import React, { Component } from "react";
import CategoriesComponent from "../../components/Admin/Category/CategoriesComponent";

export default class Categories extends Component {
  render() {
    return (
      <div className="Admin-Categories">
        <header className="Categories">
          <CategoriesComponent />
        </header>
      </div>
    );
  }
}
