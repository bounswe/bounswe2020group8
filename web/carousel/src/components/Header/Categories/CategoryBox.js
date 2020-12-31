import React, {Component} from "react";
import classes from './CategoryBox.module.css'

class CategoryBox extends Component {
    render() {
        return (
            <div className={classes.Box}>
                <p>{this.props.category}</p>
            </div>
        );
    }
}

export default CategoryBox;