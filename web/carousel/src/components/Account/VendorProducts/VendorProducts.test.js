import React from "react";

import {configure, shallow, mount} from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

import Table from "antd/lib/table";
import VendorProducts from "./VendorProducts";
import ProductForm from "./VendorEditProductForm";

configure({adapter: new Adapter()});

describe("<VendorProducts />", () => {
  let wrapper;
  let dummyProduct;

  beforeEach(() => {
    wrapper = shallow(<VendorProducts/>);
    dummyProduct = {
      title: "title",
      brand: "brand",
      category: "category",
      parameters: "parameters",
      price: "price",
      amountLeft: "amountLeft",
      cargoCompany: "cargoCompany",
      shipmentPrice: "shipmentPrice",
    };
  });

  it("should render Table with the products", () => {
    expect(wrapper.find(Table)).toHaveLength(1);
    wrapper.setState({products: dummyProduct}, () => {
    });
    expect(wrapper.find(Table).props().dataSource).toEqual(dummyProduct);
  });

  it("should render <ProductForm /> when clicked edit product", () => {
    wrapper.setState({showEditProductForm: true}, () => {
    });
    expect(wrapper.find(ProductForm)).toHaveLength(1);
  });

});