import { Form } from "antd";
import ButtonPrimary from "../../../UI/ButtonPrimary/ButtonPrimary";
import React, { useState, useContext, useEffect, useRef } from "react";
import InputUI from "../../../UI/InputUI/InputUI";
import ButtonSecondary from "../../../UI/ButtonSecondary/ButtonSecondary";
import UserInfo from "../../../Context/UserInfo";
import classes from "./SignupForm.module.css";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import GoogleLoginButton from "../../../GoogleLoginButton";
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
      return;
    } else {
      if (user.error && !userType) {
        setVisible(true);
        setError(false);
      } else setVisible(false);
      return () => {
        setUserType(false);
      };
    }
  }, [user.password, user.passwordConfirm, user.error, userType, error]);

  const eraseError = () => {
    setVisible(false);
  };

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
        marginTop: "40px",
      }}
    >
      <p>
        {user.userType === "Customer" ? "Customer Signup" : "Vendor Signup"}
      </p>
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
      <Form.Item>
        <InputUI
          name="email"
          clicked={eraseError}
          iconSel="email"
          inputType="text"
          placeholder={user.userType === "Customer" ? "user@email.com" : "user@company.com" }
        />
      </Form.Item>
      <PasswordForm eraseError={eraseError} />
      <Form.Item>
        <InputUI
          name="name"
          clicked={eraseError}
          inputType="text"
          placeholder="Name"
          iconSel="user"
          width="100px"
          styleInput={{ width: "100px" }}
        />
        <InputUI
          name="surname"
          clicked={eraseError}
          inputType="text"
          placeholder="Surname"
          iconSel="user"
          styleInput={{ width: "100px" }}
          styleIcon={{ marginLeft: "10px" }}
        />
      </Form.Item>
      {user.userType === "Vendor" ? (
        <>
          <Form.Item>
            <InputUI
              name="companyName"
              clicked={eraseError}
              inputType="text"
              placeholder="Company Name"
              iconSel="bank"
            />
          </Form.Item>
          <Form.Item>
            <InputUI
              name="companyDomain"
              clicked={eraseError}
              inputType="text"
              placeholder="Company Website Domain"
              iconSel="domain"
            />
          </Form.Item>
        </>
      ) : null}

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

        {user.userType === "Customer" ? (
          <GoogleLoginButton title={"Sign up with Google"} isSignup={true} />
        ) : null}

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
