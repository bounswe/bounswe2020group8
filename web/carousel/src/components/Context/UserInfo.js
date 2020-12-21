import React from "react";

const userInfo = React.createContext({
  email: "",
  username: "",
  token: "",
  login: () => {},
  changeEmail: () => {},
  password: "",
  setPassword: () => {},
  oldPassword: "",
  setOldPassword: () => {},
  passwordConfirm: "",
  setPasswordConfirm: () => {},
  userType: "",
  setUserType: () => {},
  name: "",
  setName: () => {},
  surname: "",
  setSurname: () => {},
  companyName: "",
  setCompanyName: () => {},
  companyDomain: "",
  setCompanyDomain: () => {},
  error: false,
  setError: () => {},
  vendorLocations: [],
  setVendorLocations: () => {},
});

export default userInfo;
