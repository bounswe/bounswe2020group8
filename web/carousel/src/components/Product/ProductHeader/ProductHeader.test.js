import React from "react";

import { configure, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

import ProductHeader from "./ProductHeader";
import StarRatings from "react-star-ratings";
import classes from "../Product.module.css";

configure({ adapter: new Adapter() });

describe("<ProductHeader />", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<ProductHeader />);
  });

  it("should render Ratings by default", () => {
    // expect(wrapper.find(Categories)).toHaveLength(1);
    wrapper.setProps({ productList: [{"_id": 1, "option": "red"}] });
    expect(wrapper.find(StarRatings)).toHaveLength(1);
  });

  it("should show brand name of the product", () => {
    // expect(wrapper.find(Categories)).toHaveLength(1);
    wrapper.setProps({ productList: [{"_id": 1, "option": "red"}] });
    wrapper.setProps({ brand: "Apple"});
    expect(wrapper.contains(<p
      style={{ marginLeft: "8px", fontSize: "12px" }}
      className={classes.ProductHeader_name}
    >
      Brand: Apple
    </p>)).toEqual(true);
  });

  it("should show price of the product", () => {
    // expect(wrapper.find(Categories)).toHaveLength(1);
    wrapper.setProps({ productList: [{"_id": 1, "option": "red"}] });
    wrapper.setProps({ price: "123"});
    expect(wrapper.contains(<p className={classes.ProductHeader_price}>$ 123</p>)).toEqual(true);
  });

  it("should show ratings of the product", () => {
    // expect(wrapper.find(Categories)).toHaveLength(1);
    wrapper.setProps({ productList: [{"_id": 1, "option": "red"}] });
    wrapper.setProps({ rating: 4.3});
    expect(wrapper.contains(<p style={{ marginRight: "6px", marginTop: "12px" }}>{4.3}</p>)).toEqual(true);
    expect(wrapper.contains(<StarRatings
      style={{ marginTop: "-20px" }}
      starDimension="15px"
      rating={4.3}
      starRatedColor="#FF9100"
      numberOfStars={5}
      name="rating"
      starSpacing="2px"
    />)).toEqual(true);
  });
});