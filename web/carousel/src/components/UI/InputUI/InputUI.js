import React, {useContext, useState} from "react";
import classes from "../UI.module.css";
import { UserOutlined, LockOutlined, BankOutlined, MailOutlined } from '@ant-design/icons';
import UserInfo from "../../Context/UserInfo";

const InputUI = (props) => {
    const [hasIcon, setHasIcon] = useState(props.iconSel !== "");

    const user = useContext(UserInfo);

    const renderSwitch = (param) => {
        switch(param) {
            case "user":
                return <span className={classes.Icon}><UserOutlined  className={classes.IconImg}/></span>;
            case "locked":
                return <span className={classes.Icon}><LockOutlined  className={classes.IconImg}/></span>;
            case "bank":
                return <span className={classes.Icon}><BankOutlined  className={classes.IconImg}/></span>;
            case "email":
                return <span className={classes.Icon}><MailOutlined  className={classes.IconImg}/></span>;
            default:
                return null;
        }
    }

    // check strength if password


    const inputChange = (data) => {
        console.log("data: " + data);
        switch (props.name) {
            case "email":
                user.changeEmail(data);
                return;
            case "password":
                user.setPassword(data);
                return;
            case "signupPassword":
                user.setPassword(data);
                return;
            case "confirmPassword":
                user.setPasswordConfirm(data);
                return;
            case "name":
                user.setName(data);
                return;
            case "company":
                user.setCompanyName(data);
                return;
            case "surname":
                user.setSurname(data);
        }
    }

    return(
        <span className={classes.InputSpan} >
            {renderSwitch(props.iconSel)}
            <input
                onChange={(event) => inputChange(event.target.value)}
                type={props.inputType}
                className={classes.Input}
                placeholder={props.placeholder}
                style={hasIcon ? null : {paddingLeft:"0" }}
                onClick={props.clicked}
            />
        </span>
    );
}

export default InputUI;

