import React from "react";

import { configure, shallow, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

import SignupForm from "./SignupForm";
import GoogleLoginButton from "../../../GoogleLoginButton";
import MapComponent from "../../../MapComponent/MapComponent";

configure({ adapter: new Adapter() });
jest.mock('axios');

describe("<SignupForm />", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<SignupForm />);
  });

  it("should not render <GoogleLoginButton /> when user type is vendor", () => {
    expect(wrapper.find(GoogleLoginButton)).toHaveLength(0);
  });

  it("should not render <MapComponent /> when user type is not vendor", () => {
    expect(wrapper.find(MapComponent)).toHaveLength(0);
  });

});