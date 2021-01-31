import React from "react";

import { configure, shallow, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

import ProductForm from "./VendorEditProductForm";
import { Form } from "antd";
import { waitFor} from "@testing-library/dom";

configure({adapter: new Adapter()});

describe("<ProductForm />", () => {
  let wrapper;
  let dummyProduct;
  let onFinishMock;
  beforeEach(() => {
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
    onFinishMock = jest.fn();
    wrapper = shallow(<ProductForm product={dummyProduct} clicked={onFinishMock} onSubmit={onFinishMock}
                                   onFinish={onFinishMock}/>);
  });

  it("should submit form data", async () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
    expect(wrapper.find(Form));
    const temp = mount(<ProductForm product={dummyProduct} clicked={onFinishMock}/>)
    wrapper.find(Form).prop("onFinish");
    temp.find('form').simulate('submit');
    await waitFor(() =>
      expect(onFinishMock).toHaveBeenCalledTimes(1)
    );

  });

});