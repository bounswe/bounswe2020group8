import React from "react";

import { configure, shallow, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

import { LoginComponent } from "./LoginComponent";
import LoginSignButtons from "./LoginSignButtons/LoginSignButtons";
import LoginContainer from "./LoginContainer/LoginContainer";
import SignupContainer from "./SignupContainer/SignupContainer";

configure({ adapter: new Adapter() });

describe("<LoginComponent />", () => {
  let wrapper;
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

  beforeEach(() => {
    wrapper = shallow(<LoginComponent />);
  });

  it("should toggle containers when <LoginSignButtons /> is clicked", () => {
    expect(wrapper.find(LoginSignButtons));
    expect(wrapper.find(LoginContainer));
    const temp = wrapper.find(LoginSignButtons).dive();
    temp.find("#signup").simulate("click",  {target: {id: "signup"}});
    wrapper.setProps({});
    expect(wrapper.find(SignupContainer)).toHaveLength(1);
  });

});