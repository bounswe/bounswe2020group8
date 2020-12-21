import React, { Component } from "react";
import services from "../../../apis/services";
import UserInfo from "../../Context/UserInfo";
import { withRouter } from "react-router-dom";
import { signIn, signOut } from "../../../redux/auth/actions";
import { connect } from "react-redux";

class AdminLoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      userType: "Customer",
      redirect: false,
      isError: false,
      errorMessage: "",
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.isError) {
      setTimeout(() => {
        this.setState({isError: false});
      }, 5000);
    }
  }



  static contextType = UserInfo;

  changeEmailHandler = (email) => {
    this.setState({email: email});
  }
  changePasswordHandler = (password) => {
    this.setState({password: password});
  }

  render() {
    return (
      <div style={{display:"grid", fontSize:"14px", marginTop:"30px", height:"30px"}}>
        <input
          style={{width:"200px", border:"black 1px solid"}}
          placeholder="admin email"
          onChange={(event) => this.changeEmailHandler(event.target.value)}/>
        <input
          style={{width:"200px", border:"black 1px solid", marginTop:"4px"}}
          placeholder="password"
          type="password"
          onChange={(event) => this.changePasswordHandler(event.target.value)}/>
        {this.state.isError ? <p>Invalid login information</p> : null}
        <button style={{width:"200px", marginTop:"20px"}} onClick={() => this.handleLoginClick()}>
          Login
        </button>
      </div>
    );
  }



  handleLoginClick = () => {
    const payload = {
      email: this.state.email,
      password: this.state.password,
    };
    let url = "/admin/loginAdmin";

    services
      .post(url, null, { params: payload })
      .then((response) => {
        this.setState({ isError: false });
        console.log(response.data);
        localStorage.setItem("token", response.data.tokenCode);
        this.context.login(this.state.email, response.data.tokenCode);
        this.context.error = false;

        this.props.signIn();
        this.props.history.push("/admin");
      })
      .catch((err, response) => {
        console.log(err);
        this.context.error = true;
        console.log("resp daata: " + response);
        this.setState({ isError: true });
      });
  };


}

export default withRouter(connect(null, { signIn })(AdminLoginComponent));