import React, {useState, useContext} from "react";
import classes from "../Login.module.css";
import UserInfo from "../../Context/UserInfo";

const LoginSignButtons = (props) => {
    const [loginBorderStyle, setLoginBorderStyle] = useState("1px solid #e6e6e6");
    const [loginBorderBottomStyle, setLoginBorderBottomStyle] = useState("none");
    const [signupBorderStyle, setSignupBorderStyle] = useState("none");
    const [signupBorderBottomStyle, setSignupBorderBottomStyle] = useState("1px solid #e6e6e6");

    const user = useContext(UserInfo);

    //let loginBorderStyle = "1px solid #e6e6e6";
    //let loginBorderBottomStyle = "none";
    //let signupBorderStyle = "none";
    //let signupBorderBottomStyle = "1px solid #e6e6e6";

    const changeActiveButton = (e) => {
        console.log(e.target.id);
        if (e.target.id === "login") {
            setLoginBorderStyle("1px solid #e6e6e6");
            setLoginBorderBottomStyle("none");
            setSignupBorderStyle("none");
            setSignupBorderBottomStyle("1px solid #e6e6e6");
        } else {
            setSignupBorderStyle ("1px solid #e6e6e6");
            setSignupBorderBottomStyle("none");
            setLoginBorderStyle("none");
            setLoginBorderBottomStyle("1px solid #e6e6e6");
        }
    }

    return (
        <div id="toggle" className={classes.Toggle}>
            <div
                id="login"
                style={
                    {left:"0",
                    backgroundColor: props.loginColor,
                    color: props.loginTextColor,
                    border: loginBorderStyle,
                    borderBottom: loginBorderBottomStyle}
                }
                onClick={(event) => {props.clicked("button1"); changeActiveButton(event)}}
                className={classes.ToggleButton}>Login</div>
            <div style={{width: "10px", height: "50px", borderBottom: "1px solid #e6e6e6", marginTop:"-11px"}}/>
            <button
                id="signup"
                style={{
                    backgroundColor: props.signupColor,
                    color: props.signupTextColor,
                    border: signupBorderStyle,
                    borderBottom: signupBorderBottomStyle}}
                onClick={(event) => {props.clicked("button2"); changeActiveButton(event)}}
                className={classes.ToggleButton}>Sign Up</button>
        </div>
    );
}

export default LoginSignButtons;