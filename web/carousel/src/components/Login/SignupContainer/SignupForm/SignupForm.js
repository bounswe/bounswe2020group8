import { Form, Checkbox, message, Modal } from "antd";
import ButtonPrimary from "../../../UI/ButtonPrimary/ButtonPrimary";
import React, { useState, useContext, useEffect, useRef } from "react";
import InputUI from "../../../UI/InputUI/InputUI";
import ButtonSecondary from "../../../UI/ButtonSecondary/ButtonSecondary";
import UserInfo from "../../../Context/UserInfo";
import GoogleLoginButton from "../../../GoogleLoginButton";
import PasswordForm from "../../../PasswordForm/PasswordForm";
import MapComponent from "../../../MapComponent/MapComponent";
import PrivacyPolicy from "../../../Agreements/PrivacyPolicy";

const SignupForm = (props) => {
  // show missing fields
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState(false);
  const [userType, setUserType] = useState(false);
  const [agreementConfirm, setAgreementConfirm] = useState(false);
  const [policyVisible, setPolicyVisible] = useState(false);

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

  const confirmAgreement = (e) => {
    console.log(`checked = ${e.target.checked}`);
    if (!agreementConfirm) setAgreementConfirm(true);
    else setAgreementConfirm(false);
  }

  const openPrivacyPolicy = (open) => {
    setPolicyVisible(open);
  }

  return (
    <div>
      {
        policyVisible ?
          <div>
            <PrivacyPolicy
              visible={true}
              setModal={() => openPrivacyPolicy(false)}
            />
          </div>
           :
          null
      }
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        style={{
          width: "400px",
          margin: "auto",
          display: "grid",
          fontSize: "16px",
          marginTop: "40px",
          marginBottom: "50px",
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
            placeholder={
              user.userType === "Customer" ? "user@email.com" : "user@company.com"
            }
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
            <Form.Item>
              <p>Please Mark the Locations of Company</p>
              <MapComponent
                isMarkerShown
                googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `400px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
                markerLocations={user.vendorLocations}
                addLocation={user.addVendorLocation}
                removeLocation={user.removeVendorLocation}
              />
            </Form.Item>
          </>
        ) : null}
        <Form.Item>
          <Checkbox onChange={confirmAgreement}>
            When signing up to our website, you will agree to our privacy policies.
          </Checkbox>
          <a onClick={() => openPrivacyPolicy(true)}>Click here to read our privacy policy.</a>


        </Form.Item>
        {/*BUTTONS */}
        <Form.Item style={{ marginBottom: "-20px" }}>
          {agreementConfirm ?
            <ButtonPrimary
              style={{ width: "274px", fontSize: "16px" }}
              title={user.userType === "Vendor" ? "REGISTER AS VENDOR" : "SIGN UP"}
              onClick={() => {
                props.clicked();
                setError(true);
              }}
            /> :
            <ButtonPrimary
              style={{ width: "274px", fontSize: "16px" }}
              title={user.userType === "Vendor" ? "REGISTER AS VENDOR" : "SIGN UP"}
              onClick={() => {
                message.warning("You need to confirm the privacy policy in order to sign up");
              }}
            />
          }


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
          />
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignupForm;
