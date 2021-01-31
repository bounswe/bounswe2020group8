import React, { Component } from "react";
import { Form, Row, Col, Input, Select, Divider, message } from "antd";
import classes from "../../components/Account/Address/AddressHeadbar.module.css";
import ButtonPrimary from "../../components/UI/ButtonPrimary/ButtonPrimary";
import PasswordForm from "../../components/PasswordForm/PasswordForm";
import UserInfo from "../../components/Context/UserInfo";
import services from "../../apis/services";
import MapComponent from "../../components/MapComponent/MapComponent";

const { Option } = Select;

export default class Profile extends Component {
  state = {
    visible: false,
    totalEarnings: 0,
  };
  static contextType = UserInfo;

  prefixSelector = () => {
    return (
      <Form.Item name="prefix" noStyle>
        <Select defaultValue="90" style={{ width: 70 }}>
          <Option value="90">+90</Option>
        </Select>
      </Form.Item>
    );
  };

  async componentDidMount() {
    const token = localStorage.getItem("token");

    if (this.context.userType === "Vendor") {
      const response = await services.get("vendor/me", {
        headers: { Authorization: "Bearer " + token },
      });

      if (response.data.data != null) {
        const data = response.data.data;
        localStorage.setItem("id", data._id);
        this.context.setCompanyName(data.companyName);
        this.context.setCompanyDomain(data.companyDomainName);
        this.context.setVendorLocations(data.locations);
        this.context.setEmail(data.email);
        this.context.setIBAN(data.IBAN);
      } else {
        message.error("Couldn't get the profile information!");
      }

      const resp = await services.get("/vendor/order/balance", {
        headers: { Authorization: "Bearer " + token },
      });

      if (resp.data.data !== null && resp.data.data.length) {
        this.setState({ totalEarnings: resp.data.data[0].balance });
      }
    }
  }
  onVendorProfileChange = async (values) => {
    const token = localStorage.getItem("token");
    if (values.companyName) {
      this.context.setCompanyName(values.companyName);
    }
    if (values.domain) {
      this.context.setCompanyDomain(values.domain);
    }
    if (values.iban) {
      this.context.setIBAN(values.iban);
    }
    if (values.phone) {
      this.setState({ phone: values.phone });
    }
    if (values.about) {
      this.setState({ aboutCompany: values.about });
    }

    const payload = {
      companyName: this.context.companyName,
      companyDomainName: this.context.companyDomain,
      IBAN: this.context.IBAN,
      locations: this.context.vendorLocations,
      phoneNumber: this.state.phone,
      aboutCompany: this.state.aboutCompany,
    };
    const response = await services.patch("/vendor/me", payload, {
      headers: { Authorization: "Bearer " + token },
    });
    if (response) {
      this.props.history.push("/vendor/account/profile");
    } else {
      return;
    }
  };

  eraseError = () => {
    this.setState({ visible: false });
  };

  addVendorLocationHandler = (newLocation) => {
    this.setState({ locations: [...this.locations, newLocation] });
  };
  removeLocationHandler = (removedLocationLat, removedLocationLng) => {
    this.state({
      locations: this.locations.filter(
        (location) =>
          location.lat !== removedLocationLat ||
          location.lng !== removedLocationLng
      ),
    });
  };

  onPasswordChange = () => {
    let url = "";
    if (this.context.userType === "Customer") {
      url = "/customer/changePassword";
    } else if (this.context.userType === "Vendor") {
      url = "/vendor/changePassword";
    } else {
      return;
    }
    const token = localStorage.getItem("token");
    const payload = {
      oldPassword: this.context.oldPassword,
      newPassword: this.context.password,
      newPasswordRepeat: this.context.passwordConfirm,
    };
    services
      .post(url, null, {
        params: payload,
        headers: { Authorization: "Bearer " + token },
      })
      .then((response) => {
        this.context.error = false;
        this.setState({ visible: false });
        this.props.history.push("/");
      })
      .catch((err, response) => {
        console.log(err);
        this.context.error = true;
        this.setState({ visible: true });
      });
  };

  renderVendorProfileChangeForm() {
    return (
      <Col span={10} style={{ textAlign: "left" }}>
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          size="middle"
          onFinish={this.onVendorProfileChange}
        >
          <Form.Item name="companyName" label="Company Name">
            <Input placeholder={this.context.companyName} />
          </Form.Item>

          <Form.Item name="location" label="Company Locations">
            <MapComponent
              isMarkerShown
              googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `400px` }} />}
              mapElement={<div style={{ height: `100%` }} />}
              markerLocations={this.context.vendorLocations || []}
              addLocation={this.context.addVendorLocation}
              removeLocation={this.context.removeVendorLocation}
            />
          </Form.Item>

          <Form.Item name="email" label="E-mail">
            <Input placeholder={this.context.email} disabled />
          </Form.Item>

          <Form.Item name="iban" label="IBAN">
            <Input placeholder={this.context.IBAN} />
          </Form.Item>

          <Form.Item name="domain" label="Company Website">
            <Input placeholder={this.context.companyDomain} />
          </Form.Item>

          <Form.Item name="phone" label="Contact Number">
            <Input
              placeholder={this.context.phone}
              addonBefore={this.prefixSelector()}
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item name="about" label="About Company">
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 6, span: 14 }}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
              }}
            >
              <ButtonPrimary title="Save Changes" style={{ width: 150 }} />
            </div>
          </Form.Item>
        </Form>
      </Col>
    );
  }

  renderPasswordChangeForm() {
    return (
      <div>
        <Form
          style={{ width: 400 }}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          size="middle"
        >
          <div style={{ padding: 10 }}>
            {this.state.visible ? (
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
                Invalid password!
              </p>
            ) : null}
          </div>
          <PasswordForm showOldPassword eraseError={this.eraseError} />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              paddingRight: 100,
            }}
          >
            <Form.Item wrapperCol={{ offset: 6, span: 14 }}>
              <ButtonPrimary
                title="Change Password"
                style={{ width: 150 }}
                onClick={this.onPasswordChange}
              />
            </Form.Item>
          </div>
        </Form>
      </div>
    );
  }

  render() {
    return (
      <div>
        <div className={classes.Headbar}>
          <span style={{ fontSize: "xx-large" }}>My Profile</span>
        </div>
        <Row
          style={{
            justifyContent: "space-evenly",
            display: "flex",
          }}
        >
          {this.renderVendorProfileChangeForm()}

          <Col span={2}>
            <Divider style={{ height: "100%" }} type="vertical" />
          </Col>
          <Col span={12}>{this.renderPasswordChangeForm()}</Col>
          <div
            style={{
              marginLeft: "100px",
              marginTop: "-400px",
              fontSize: "16px",
            }}
          >
            Total earnings: <strong>{this.state.totalEarnings} $</strong>
          </div>
        </Row>
      </div>
    );
  }
}
