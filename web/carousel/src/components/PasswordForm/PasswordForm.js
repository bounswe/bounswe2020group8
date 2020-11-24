import React, {Component} from "react";
import TextField from "material-ui/TextField";
import classes from "./PasswordForm.module.css";


class PasswordForm extends Component {


    // Returns Error message if applicable, otherwise returns empty string
    checkPassword(password) {
        const genericErrorMessage = "Password must contain numbers or characters of length between 6 and 20,  at least one lowercase letter, one uppercase letter, one numeric digit, and must not contain white space."
        let isCorrect = true;

        if (!password || password === "") {
            isCorrect = false;
        } else if (password.length < 6 || password.length > 20) {
            isCorrect = false;
        } else if (/\d/.test(password) === false) {
            isCorrect = false;
        } else if (/[a-z]/.test(password) === false) {
            isCorrect = false;
        } else if (/[A-Z]/.test(password) === false) {
            isCorrect = false;
        } else if (/\s/.test(password) === true) {
            isCorrect = false;
        }

        if (!isCorrect) {
            return genericErrorMessage;
        }

        return "";
    }
    

    render() {

        const errorMessage = this.checkPassword(this.props.password);

        let errorMessageLine = null;

        if (errorMessage !== "") {
            errorMessageLine = (<p className={classes.ErrorMessage}>{errorMessage}</p>);
            if (!this.props.wasWeak) {
                this.props.setIsWeak(true);
            }
        } else {
            if (this.props.wasWeak) {
                this.props.setIsWeak(false);
            }
        }

        return (
            <div>
                <TextField
                    type="password"
                    hintText="Enter your Password"
                    floatingLabelText="Password"
                    onChange={this.props.onChange}
                />
                {errorMessageLine}
            </div>
        );
    }


}

export default PasswordForm;
