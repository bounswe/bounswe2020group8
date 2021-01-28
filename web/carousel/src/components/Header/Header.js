import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Categories from "./Categories/Categories";
import SearchBar from "./SearchBar/SearchBar";
import SideButtons from "./SideButtons/SideButtons";
import OrderTrack from "./OrderTrack/OrderTrack";
import classes from "./Header.module.css";
import logo from "../../assets/images/carousel_logo.jpg";
import qs from "qs";
import userInfo from "../Context/UserInfo";
import services from "../../apis/services";

export class Header extends Component {
  state = {
    searchValue: "",
    placeholderSearchString: "Search for something...",
    searchOn: false,
    categories: [],
  };

  static contextType = userInfo;

  componentDidMount() {
    const URL = "/category";
    services
      .get(URL)
      .then((response) => {
        console.log(response);
        this.setState({ categories: response.data.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  searchStringChangeHandler = (event, id) => {
    this.setState({ searchValue: "" });
    let searchValue = event.target.value;
    if (!this.state.searchOn) {
      searchValue = searchValue.substr(searchValue.length - 1, 1);
    }
    this.setState({ searchValue: searchValue, searchOn: true });
  };

  // detect enter on search bar
  keyPressHandler = (e) => {
    if (e.key === "Enter") {
      this.props.history.push("/search?query=" + this.state.searchValue);
    }
  };

  // clicked on search incon
  iconPressHandler = (e) => {
    this.props.history.push("/search?query=" + this.state.searchValue);
  };

  handleCarouselClicked = () => {
    if (this.context.userType === "Vendor") {
      this.props.history.push("/vendor");
    } else {
      this.props.history.push("/");
    }
  };

  render() {
    const { query } = qs.parse(this.props.location.search, {
      ignoreQueryPrefix: true,
    });
    return (
      <>
        <header className={classes.Header}>
          <div
            className={classes.Toolbar}
            style={{ height: "20px", borderBottom: "none" }}
          >
            <a
              className={classes.Track}
              onClick={() => this.props.history.push("/order-track")}
            >
              Track your order
            </a>
          </div>
          <div className={classes.Toolbar}>
            <img
              src={logo}
              alt={"carouselSite"}
              className={classes.Img}
              onClick={this.handleCarouselClicked}
            />
            {this.context.userType !== "Vendor" ? (
              <SearchBar
                searchString={this.state.searchValue}
                changeString={this.searchStringChangeHandler}
                written={this.state.searchOn}
                defaultString={this.state.placeholderSearchString}
                keyHandler={this.keyPressHandler}
                iconHandler={this.iconPressHandler}
              />
            ) : null}

            <SideButtons />
          </div>
          <Categories categories={this.state.categories} />
        </header>
        <div className={classes.Filler} />
      </>
    );
  }
}

export default withRouter(Header);
