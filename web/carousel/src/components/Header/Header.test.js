import React from "react";

import { configure, shallow, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

import { Header } from "./Header";
import SearchBar from "./SearchBar/SearchBar";

configure({ adapter: new Adapter() });

describe("<Header />", () => {
  let wrapper;
  let mProps;

  beforeEach(() => {
    const location = {search: "searchQuery"};
    mProps = { history: { push: jest.fn() } };
    const history = { push: jest.fn() };
    wrapper = shallow(<Header location={location} {...mProps}/>);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render <SearchBar />", () => {
    expect(wrapper.find(SearchBar)).toHaveLength(1);
  });

  it("should search entered string", () => {
    const instance = wrapper.instance();
    wrapper.setState({ searchOn: true }, () => {});
    instance.searchStringChangeHandler({target: {value: "watch"}});
    instance.keyPressHandler({key: "Enter"});
    expect(mProps.history.push).toBeCalledWith("/search?query=watch");
  });

});