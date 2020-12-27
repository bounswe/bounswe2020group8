import { Form } from "antd";

import React, { useState, useContext, useEffect, useRef } from "react";
import InputUI from "../UI/InputUI/InputUI";
import classes from "./PasswordForm.module.css";
import UserInfo from "../Context/UserInfo";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

const PasswordForm = (props) => {
  // password states
  const [passLength, setPassLength] = useState(false);
  const [passDigit, setPassDigit] = useState(false);
  const [passLetter, setPassLetter] = useState(false);
  const [passLetterCapital, setPassLetterCapital] = useState(false);
  const [passNoWhitespace, setPassNoWhitespace] = useState(true);

  // confirm password
  const [password, setPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(false);

  const user = useContext(UserInfo);

  useEffect(() => {
    // check strength of the password
    if (user.password.length < 6 || user.password.length > 20) {
      setPassLength(false);
    } else setPassLength(true);
    if (/\d/.test(user.password) === false) {
      setPassDigit(false);
    } else setPassDigit(true);
    if (/[a-z]/.test(user.password) === false) {
      setPassLetter(false);
    } else setPassLetter(true);
    if (/[A-Z]/.test(user.password) === false) {
      setPassLetterCapital(false);
    } else setPassLetterCapital(true);
    if (/\s/.test(user.password) === true) {
      setPassNoWhitespace(false);
    } else setPassNoWhitespace(true);

    // check if password and confirmed password match
    if (user.password === user.passwordConfirm && user.password !== "") {
      setPasswordMatch(true);
    } else setPasswordMatch(false);
  }, [user.password, user.passwordConfirm]);

  return (
    <>
      {props.showOldPassword ? (
        <Form.Item name="oldPassword">
          <InputUI
            name="oldPassword"
            clicked={props.eraseError}
            inputType="password"
            placeholder="Old-password"
            iconSel="locked"
          />
        </Form.Item>
      ) : null}
      <Form.Item name="signupPassword">
        <InputUI
          name="signupPassword"
          clicked={props.eraseError}
          inputType="password"
          placeholder="Password"
          iconSel="locked"
        />
      </Form.Item>
      <Form.Item style={{ marginTop: "-2px" }}>
        <span className={classes.Span}>
          {!passLength ? (
            <>
              <CloseCircleOutlined
                className={classes.Icon}
                style={{ color: "red" }}
              />
              <p style={{ color: "red" }} className={classes.PasswordCheck}>
                Password should be between 6-20 characters.
              </p>
            </>
          ) : null}
        </span>
        <span className={classes.Span}>
          {passDigit ? null : (
            <>
              <CloseCircleOutlined
                className={classes.Icon}
                style={{ color: "red" }}
              />
              <p style={{ color: "red" }} className={classes.PasswordCheck}>
                Password should contain a digit.
              </p>
            </>
          )}
        </span>
        <span className={classes.Span}>
          {passLetter ? null : (
            <>
              <CloseCircleOutlined
                className={classes.Icon}
                style={{ color: "red" }}
              />
              <p style={{ color: "red" }} className={classes.PasswordCheck}>
                Password should contain a small letter.
              </p>
            </>
          )}
        </span>
        <span className={classes.Span}>
          {passLetterCapital ? null : (
            <>
              <CloseCircleOutlined
                className={classes.Icon}
                style={{ color: "red" }}
              />
              <p style={{ color: "red" }} className={classes.PasswordCheck}>
                Password should contain a capital letter.
              </p>
            </>
          )}
        </span>
        <span className={classes.Span}>
          {passNoWhitespace ? null : (
            <>
              <CloseCircleOutlined
                className={classes.Icon}
                style={{ color: "red" }}
              />
              <p style={{ color: "red" }} className={classes.PasswordCheck}>
                Password should not contain whitespace.
              </p>
            </>
          )}
        </span>
      </Form.Item>
      <Form.Item>
        <InputUI
          name="confirmPassword"
          clicked={props.eraseError}
          inputType="password"
          placeholder="Confirm Password"
          iconSel="locked"
        />
        <span className={classes.Span} style={{ marginTop: "8px" }}>
          {passwordMatch ? null : (
            <>
              <CloseCircleOutlined
                className={classes.Icon}
                style={{ color: "red" }}
              />
              <p style={{ color: "red" }} className={classes.PasswordCheck}>
                Password and Confirm Password should match.
              </p>
            </>
          )}
        </span>
      </Form.Item>
    </>
  );
};

export default PasswordForm;
