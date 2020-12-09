import { Form } from "antd";
import ButtonPrimary from "../../../UI/ButtonPrimary/ButtonPrimary";
import React, { useState, useContext, useEffect, useRef } from "react";
import InputUI from "../../../UI/InputUI/InputUI";
import ButtonSecondary from "../../../UI/ButtonSecondary/ButtonSecondary";
import UserInfo from "../../../Context/UserInfo";

import classes from "./SignupForm.module.css";

import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import PasswordForm from "../../../PasswordForm/PasswordForm";

const SignupForm = (props) => {
  // show missing fields
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState(false);
  const [userType, setUserType] = useState(false);

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
      <PasswordForm eraseError={eraseError}/>
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
