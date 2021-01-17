import React, { useState } from "react";

import { configure, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import axios from "axios";

import Product from "./Product";
import ProductActions from "./ProductActions/ProductActions";
import ProductPhotoCarousel from "./ProductPhotoCarousel/ProductPhotoCarousel";
import ProductHeader from "./ProductHeader/ProductHeader";
import SectionToggle from "./ProductInfo/SectionToggle";

configure({ adapter: new Adapter() });

describe("<Product />", () => {
  let wrapper;
  let mockHandleOnProductChange = jest.fn();

  beforeEach(() => {
    wrapper = shallow(<Product props handleOnProductChange={mockHandleOnProductChange}/>);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should have no ProductPage if productInfo is null", async() => {
    expect(wrapper.find(ProductPhotoCarousel)).toHaveLength(0);
    expect(wrapper.find(ProductHeader)).toHaveLength(0);
    expect(wrapper.find(ProductActions)).toHaveLength(0);
    expect(wrapper.find(SectionToggle)).toHaveLength(0);
  });

});