import React, {Component} from 'react';

import classes from './Header.module.css';
import logo from '../../assets/icons/carousel_logo.jpg';
import SearchBar from "./SearchBar/SearchBar";
import SideButtons from "./SideButtons/SideButtons";

class Header extends Component {
    state = {
        searchValue: "",
        defaultSearchString: "Search for something...",
        searchOn: false,
        loggedIn: false
    }

    loginClickHandler = () => {
        const authenticated = this.state.loggedIn;
        if (authenticated) {
            this.setState({loggedIn: false});
        }
        else {
            this.setState({loggedIn: true});
        }
    }

    searchStringChangeHandler = (event, id) => {
        this.setState({searchValue: ""});
        let searchValue = event.target.value;
        if (!this.state.searchOn) {
            searchValue = searchValue.substr(searchValue.length-1, 1);
        }
        this.setState({searchValue: searchValue, searchOn: true});
    }

    inputFocusHandler = () => {

    }

    // detect enter on search bar
    keyPressHandler = (e) => {
        if (e.key === "Enter") {
            alert("Searching");
        }
    }

    // clicked on search incon
    iconPressHandler = (e) => {
        alert("Searching");
    }

    render() {
        // if (this.state.searchValue === ""){
        //     this.setState({searchValue: "Search for something", searchOn: false});
        // }

        return(
            <header className={classes.Toolbar}>

                <img src={logo} alt={"carouselSite"} style={{
                    backgroundColor: "white",
                    padding: "0px",
                    height: "80%",
                    boxSizing: "border-box"
                }}/>
                <SearchBar
                    searchString={this.state.searchValue}
                    changeString={this.searchStringChangeHandler}
                    written={this.state.searchOn}
                    defaultString={this.state.defaultSearchString}
                    keyHandler={this.keyPressHandler}
                    iconHandler={this.iconPressHandler}/>
                <SideButtons
                    authenticated={this.state.loggedIn}
                    clicked={this.loginClickHandler}
                />
            </header>
        );
    }
}

export default Header;