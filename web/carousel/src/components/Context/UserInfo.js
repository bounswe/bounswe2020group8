import React from "react";

const userInfo = React.createContext({
    email: "",
    username: "",
    token: "",
    login: () => {}
});

export default userInfo;
