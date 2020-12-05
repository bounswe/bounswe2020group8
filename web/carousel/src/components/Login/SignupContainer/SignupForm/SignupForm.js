import { Form } from "antd";
import ButtonPrimary from "../../../UI/ButtonPrimary/ButtonPrimary";
import React, { useState, useContext, useEffect, useRef } from "react";
import InputUI from "../../../UI/InputUI/InputUI";
import ButtonSecondary from "../../../UI/ButtonSecondary/ButtonSecondary";
import UserInfo from "../../../Context/UserInfo";

import classes from "./SignupForm.module.css";

import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

const SignupForm = (props) => {
  // show missing fields
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState(false);
  const [userType, setUserType] = useState(false);

  // password states
  const [passLength, setPassLength] = useState(false);
  const [passDigit, setPassDigit] = useState(false);
  const [passLetter, setPassLetter] = useState(false);
  const [passLetterCapital, setPassLetterCapital] = useState(false);
  const [passNoWhitespace, setPassNoWhitespace] = useState(true);

  // confirm password
  const [password, setPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(false);

  const isFirstRun = useRef(true);
  const user = useContext(UserInfo);

  useEffect(() => {
    user.setUserType("Customer");
  }, []);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      console.log("returning");
      return;
    } else {
      if (user.error && !userType) {
        setVisible(true);
        setError(false);
      } else setVisible(false);

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

      return () => {
        setUserType(false);
      };
    }
  }, [user.password, user.passwordConfirm, user.error, userType, error]);

  const eraseError = () => {
    setVisible(false);
  };
  console.log("userInfo err: " + user.error);
  console.log("user type: " + userType);

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      style={{
        height: "500px",
        margin: "auto",
        display: "grid",
        fontSize: "16px",
        paddingTop: "40px",
      }}
    >
      {visible ? (
        <p
          style={{
            backgroundColor: "#ffb3b3",
            color: "darkred",
            margin: "auto",
            marginTop: "-20px",
            border: "1px solid darkred",
            width: "240px",
          }}
        >
          Invalid information!
        </p>
      ) : (
        <p
          style={{
            backgroundColor: "#ffffff",
            color: "white",
            margin: "auto",
            marginTop: "-20px",
            border: "1px solid white",
            width: "240px",
          }}
        >
          .
        </p>
      )}
      <Form.Item name="email">
        <InputUI
          name="email"
          clicked={eraseError}
          iconSel="email"
          inputType="text"
          placeholder="E-mail"
        />
      </Form.Item>
      <Form.Item name="signupPassword">
        <InputUI
          name="signupPassword"
          clicked={eraseError}
          inputType="password"
          placeholder="Password"
          iconSel="locked"
        />
      </Form.Item>

      <Form.Item style={{ marginTop: "-2px" }}>
        <span className={classes.Span}>
          {passLength ? (
            <CheckCircleOutlined
              className={classes.Icon}
              style={{ color: "forestgreen" }}
            />
          ) : (
            <CloseCircleOutlined
              className={classes.Icon}
              style={{ color: "red" }}
            />
          )}
          <p
            style={passLength ? { color: "forestgreen" } : { color: "red" }}
            className={classes.PasswordCheck}
          >
            Password should be between 6-20 characters.
          </p>
        </span>
        <span className={classes.Span}>
          {passDigit ? (
            <CheckCircleOutlined
              className={classes.Icon}
              style={{ color: "forestgreen" }}
            />
          ) : (
            <CloseCircleOutlined
              className={classes.Icon}
              style={{ color: "red" }}
            />
          )}
          <p
            style={passDigit ? { color: "forestgreen" } : { color: "red" }}
            className={classes.PasswordCheck}
          >
            Password should contain a digit.
          </p>
        </span>
        <span className={classes.Span}>
          {passLetter ? (
            <CheckCircleOutlined
              className={classes.Icon}
              style={{ color: "forestgreen" }}
            />
          ) : (
            <CloseCircleOutlined
              className={classes.Icon}
              style={{ color: "red" }}
            />
          )}
          <p
            style={passLetter ? { color: "forestgreen" } : { color: "red" }}
            className={classes.PasswordCheck}
          >
            Password should contain a small letter.
          </p>
        </span>
        <span className={classes.Span}>
          {passLetterCapital ? (
            <CheckCircleOutlined
              className={classes.Icon}
              style={{ color: "forestgreen" }}
            />
          ) : (
            <CloseCircleOutlined
              className={classes.Icon}
              style={{ color: "red" }}
            />
          )}
          <p
            style={
              passLetterCapital ? { color: "forestgreen" } : { color: "red" }
            }
            className={classes.PasswordCheck}
          >
            Password should contain a capital letter.
          </p>
        </span>
        <span className={classes.Span}>
          {passNoWhitespace ? (
            <CheckCircleOutlined
              className={classes.Icon}
              style={{ color: "forestgreen" }}
            />
          ) : (
            <CloseCircleOutlined
              className={classes.Icon}
              style={{ color: "red" }}
            />
          )}
          <p
            style={
              passNoWhitespace ? { color: "forestgreen" } : { color: "red" }
            }
            className={classes.PasswordCheck}
          >
            Password should not contain whitespace.
          </p>
        </span>
      </Form.Item>

      <Form.Item>
        <InputUI
          name="confirmPassword"
          clicked={eraseError}
          inputType="password"
          placeholder="Confirm Password"
          iconSel="locked"
        />
        <span className={classes.Span} style={{ marginTop: "8px" }}>
          {passwordMatch ? (
            <CheckCircleOutlined
              className={classes.Icon}
              style={{ color: "forestgreen" }}
            />
          ) : (
            <CloseCircleOutlined
              className={classes.Icon}
              style={{ color: "red" }}
            />
          )}
          <p
            style={passwordMatch ? { color: "forestgreen" } : { color: "red" }}
            className={classes.PasswordCheck}
          >
            Password and Confirm Password should match.
          </p>
        </span>
      </Form.Item>
      <Form.Item name="name">
        <InputUI
          name="name"
          clicked={eraseError}
          inputType="text"
          placeholder="Name"
          iconSel="user"
        />
      </Form.Item>
      {user.userType === "Vendor" ? (
        <Form.Item name="company">
          <InputUI
            name="company"
            clicked={eraseError}
            inputType="text"
            placeholder="Company Name"
            iconSel="bank"
          />
        </Form.Item>
      ) : (
        <Form.Item name="surname">
          <InputUI
            name="surname"
            clicked={eraseError}
            inputType="text"
            placeholder="Surname"
            iconSel="user"
          />
        </Form.Item>
      )}

      {/*BUTTONS*/}
      <Form.Item style={{ marginBottom: "-20px" }}>
        <ButtonPrimary
          style={{ width: "274px", fontSize: "16px" }}
          title={user.userType === "Vendor" ? "REGISTER AS VENDOR" : "SIGN UP"}
          onClick={() => {
            props.clicked();
            setError(true);
          }}
        ></ButtonPrimary>
        <br style={{ height: "10px" }} />
        <ButtonSecondary
          style={{
            width: "274px",
            fontSize: "16px",
            textDecoration: "underline",
          }}
          onClick={() => {
            setUserType(true);
            user.userType === "Vendor"
              ? user.setUserType("Customer")
              : user.setUserType("Vendor");
          }}
          title={
            user.userType === "Vendor"
              ? "Sign up as Customer"
              : "Do you want to sell?"
          }
        ></ButtonSecondary>
      </Form.Item>
    </Form>
  );
};

export default SignupForm;
