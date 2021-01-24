import React, { useState } from "react";

import { configure, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

import SectionToggle from "./SectionToggle";
import OtherSellersComponent from "./OtherSellers/OtherSellersComponent";
import FeaturesComponent from "./Features/FeaturesComponent";
import CommentsComponent from "./Comments/CommentsComponent";

configure({ adapter: new Adapter() });

describe("<SectionToggle />", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<SectionToggle product mainProduct setProductInfo section=""/>);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render section toggle buttons", () => {
    expect(wrapper.find("button").at(0).prop("id")).toEqual("features");
    expect(wrapper.find("button").at(1).prop("id")).toEqual("sellers");
    expect(wrapper.find("button").at(2).prop("id")).toEqual("comments");
  });

  it("should show only FeaturesComponent by default", () => {
    expect(wrapper.find(FeaturesComponent)).toHaveLength(1);
    expect(wrapper.find(OtherSellersComponent)).toHaveLength(0);
    expect(wrapper.find(CommentsComponent)).toHaveLength(0);
  });

  it("should show only OtherSellersComponent when Other Sellers section is selected", () => {
    wrapper.find("button").at(1).simulate("click", { target: { id: "sellers" } });
    expect(wrapper.find(FeaturesComponent)).toHaveLength(0);
    expect(wrapper.find(OtherSellersComponent)).toHaveLength(1);
    expect(wrapper.find(CommentsComponent)).toHaveLength(0);
  });

  it("should show only CommentsComponent when Comments section is selected", () => {
    wrapper.find("button").at(2).simulate("click", { target: { id: "comments" } });
    expect(wrapper.find(FeaturesComponent)).toHaveLength(0);
    expect(wrapper.find(OtherSellersComponent)).toHaveLength(0);
    expect(wrapper.find(CommentsComponent)).toHaveLength(1);
  });

});