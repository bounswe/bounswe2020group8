import React, {Component} from "react";
import classes from './Categories.module.css'

import CategoryBox from './CategoryBox';

class Categories extends Component {
    categories = ["Fashion", "Toys & Hobbies", "Electronics", "Furniture", "Personal Care"]
    render() {
        return (
            <div className={classes.Categories}>
                {
                    this.categories.map((category) => {
                        // return <span><CategoryBox category={category} /></span>
                        return <CategoryBox category={category} />
                    })
                }
            </div>
        );
    }


}

export default Categories;