import React from "react";

const userInfo = React.createContext({
    email: "",
    username: "",
    login: () => {}
});

export default userInfo;