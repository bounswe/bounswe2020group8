import React from "react";
import { Dropdown, Menu } from "antd";

import { configure, shallow, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

import { SideButtons } from "./SideButtons";
import DropdownContainer from "../../DropdownContainer/DropdownContainer";
import { MemoryRouter } from 'react-router-dom';

configure({ adapter: new Adapter() });

describe("<SideButtons />", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<SideButtons />);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("should not render Account DropdownContainer if not authenticated", () => {
    expect(wrapper.find(DropdownContainer)).toHaveLength(0);
  });

  it("should render Account DropdownContainer if logged in", () => {
    window.localStorage.setItem("login", "true");

    // calling setProps() to force re-render
    wrapper.setProps({});
    expect(wrapper.find(DropdownContainer)).toHaveLength(1);
  });

  it("should not render Account dropdown when logged out", () => {
    const fullWrapper = mount(<SideButtons />);
    window.localStorage.setItem("login", "true");
    fullWrapper.setProps({});
    const dropdown = fullWrapper.find(Dropdown);
    const mProps = { history: { push: jest.fn(), listen: () => {} } };
    const submenu = mount(<MemoryRouter initialEntries={[ '/random' ]} {...mProps}>{dropdown.prop('overlay')}</MemoryRouter>);
    submenu.find(Menu.Item).at(4).simulate("click");
    window.localStorage.setItem("login", "false");
    fullWrapper.setProps({});
    expect(fullWrapper.find(DropdownContainer)).toHaveLength(0);
  });

});