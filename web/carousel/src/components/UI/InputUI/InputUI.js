import React, {useContext, useState} from "react";
import classes from "../UI.module.css";
import { UserOutlined, LockOutlined, BankOutlined, MailOutlined, CloudOutlined } from '@ant-design/icons';
import UserInfo from "../../Context/UserInfo";

const InputUI = (props) => {
    const [hasIcon, setHasIcon] = useState(props.iconSel !== "");

    const user = useContext(UserInfo);

    const renderSwitch = (param) => {
        switch(param) {
            case "user":
                return <span className={classes.Icon} style={props.styleIcon}><UserOutlined  className={classes.IconImg}/></span>;
            case "domain":
                return <span className={classes.Icon} style={props.styleIcon}><CloudOutlined  className={classes.IconImg}/></span>;
            case "locked":
                return <span className={classes.Icon} style={props.styleIcon}><LockOutlined  className={classes.IconImg}/></span>;
            case "bank":
                return <span className={classes.Icon} style={props.styleIcon}><BankOutlined  className={classes.IconImg}/></span>;
            case "email":
                return <span className={classes.Icon} style={props.styleIcon}><MailOutlined  className={classes.IconImg}/></span>;
            default:
                return null;
        }
    }

    // check strength if password


    const inputChange = (data) => {
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
            case "surname":
                user.setSurname(data);
            case "companyName":
                user.setCompanyName(data);
                return;
            case "companyDomain":
                user.setCompanyDomain(data);
                return;
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
                style={props.styleInput}
            />
        </span>
    );
}

export default InputUI;

