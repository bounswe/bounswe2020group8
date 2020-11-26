import React, {Component} from "react";
import classes from './Categories.module.css'

import CategoryBox from './CategoryBox';

class Categories extends Component {
    render() {
        return (
            <div className={classes.Categories}>
                {
                    this.props.categories.map((category) => {
                        return <CategoryBox category={category} />
                    })
                }
            </div>
        );
    }
}

export default Categories;