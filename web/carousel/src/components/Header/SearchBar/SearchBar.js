import React, {Component} from "react";
import classes from "./SearchBar.module.css";
import searchIcon from "../../../assets/images/search-icon.png"


class SearchBar extends Component {
    state = {
        inputFocused: false
    }

    isInputFocus = () => {
        this.setState({inputFocused: true});
    }

    notInputFocus = () => {
        this.setState({inputFocused: false});
    }

    render() {
        return (
            <div className={this.state.inputFocused ? classes.focused : classes.notFocused} >
                <input className={classes.Search}
                       value={this.props.searchString}
                       onChange={event => this.props.changeString(event)}
                       placeholder={this.props.defaultString}
                       onKeyPress={this.props.keyHandler}
                       onFocus={this.isInputFocus}
                       onBlur={this.notInputFocus}/>
                <img src={searchIcon}
                     style={{width:"20px", height:"20px", paddingRight:"5px"}}
                     onClick={this.props.iconHandler}
                     alt={"search-icon"}/>
            </div>
        );
    }


}

export default SearchBar;