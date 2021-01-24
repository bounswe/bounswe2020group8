import React from "react";

import { configure, shallow, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

import LoginForm from "./LoginForm";
import GoogleLoginButton from "../../../GoogleLoginButton";

configure({ adapter: new Adapter() });

describe("<LoginForm />", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<LoginForm />);
  });

  it("should not render <GoogleLoginButton /> when user type is vendor", () => {
    console.log(wrapper.debug());
    expect(wrapper.find(GoogleLoginButton)).toHaveLength(0);
  });

});