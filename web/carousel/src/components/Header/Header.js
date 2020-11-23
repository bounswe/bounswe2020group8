import React, {Component} from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import Categories from './Categories/Categories';
import SearchBar from "./SearchBar/SearchBar";
import SideButtons from "./SideButtons/SideButtons";
import {signIn, signOut} from "../../redux/auth/actions";

import classes from './Header.module.css';
import logo from '../../assets/images/carousel_logo.jpg';

class Header extends Component {
    state = {
        searchValue: "",
        placeholderSearchString: "Search for something...",
        searchOn: false,
    }

    categories = ["Fashion", "Toys & Hobbies", "Electronics", "Furniture", "Personal Care"];

    openProfileHandler = () => {
        alert("Open Profile");
    }

    searchStringChangeHandler = (event, id) => {
        this.setState({searchValue: ""});
        let searchValue = event.target.value;
        if (!this.state.searchOn) {
            searchValue = searchValue.substr(searchValue.length - 1, 1);
        }
        this.setState({searchValue: searchValue, searchOn: true});
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
        return (
            <>
            <header className={classes.Header}>
                <div className={classes.Toolbar}>
                    <img src={logo} alt={"carouselSite"} 
                className={classes.Img}
                        onClick={() => this.props.history.push("/")}/>
                    <SearchBar
                        searchString={this.state.searchValue}
                        changeString={this.searchStringChangeHandler}
                        written={this.state.searchOn}
                        defaultString={this.state.placeholderSearchString}
                        keyHandler={this.keyPressHandler}
                        iconHandler={this.iconPressHandler}/>
                    <SideButtons
                        authenticated={this.props.isSignedIn}
                        clicked={this.props.isSignedIn ? this.openProfileHandler : () => this.props.history.push("/login") }/>
                </div>
                <Categories categories={this.categories}/>
            </header>
            <div className={classes.Filler} />
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isSignedIn: state.auth.isSignedIn,
        googleId: state.auth.googleId
    };
}

export default withRouter(connect(mapStateToProps, { signIn, signOut })(Header));