import React from "react";

const userInfo = React.createContext({
    email: "",
    username: "",
    token: "",
    login: () => {},
    changeEmail: () => {},
    password: "",
    setPassword: () => {},
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
    error: false,
    setError: () => {}
});

export default userInfo;
