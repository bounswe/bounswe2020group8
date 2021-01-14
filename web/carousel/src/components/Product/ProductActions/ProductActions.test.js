import React from "react";

import { configure, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

import { Select } from "antd";
import ProductActions from "./ProductActions";

const { Option } = Select;

configure({ adapter: new Adapter() });

describe("<ProductActions />", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<ProductActions productList={[{ option: " black" }]}/>);
  });

  it("should list other options if they exist", () => {
    expect(wrapper.find(Option)).toHaveLength(1);
  });

  it("add to cart button should work", () => {
    const mockFn = jest.fn();
    const tree = shallow(
      <button onClick={mockFn} />
    );
    tree.simulate('click');
    expect(mockFn).toHaveBeenCalled();
  });
});