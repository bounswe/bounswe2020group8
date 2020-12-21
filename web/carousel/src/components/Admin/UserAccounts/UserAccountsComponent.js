import React, { Component, useState } from "react";
import axios from "axios";
import services from "../../../apis/services";

import { SearchOutlined } from "@ant-design/icons";
import Table from "antd/lib/table";

import PopUp from "../../UI/PopUp/PopUp";
import classes from "./UserAccountsComponent.module.css";
import { Space } from "antd";

const TOKEN = localStorage.getItem("token");


export default class UserAccountsComponent extends Component {
  constructor(props) {
    super(props);
    this.state =
      { users: null,
        userEmpty: true,
        columns: [],
        data: null,
        sortParams:"",
        showPopup:false,
        id: "",
        actionType:"",
        userName: "",
      };
  }

  componentDidMount() {
    this.setState({ token: TOKEN });
    this.searchRequest();
  }

  // search for a user, http request
  searchRequest = (value = "") => {
    let config = "";
    let getCustomer = "";
    let getVendor = "";
    if(value === "") {
      config = {
        headers: { Authorization: `Bearer ${TOKEN}` },
      };
      getCustomer = services.get("/customer", config);
      getVendor = services.get( "/vendor", config);
    } else {
      let regex = new RegExp(  value , "g");
      console.log(regex);
      config = {
        headers: { Authorization: `Bearer ${TOKEN}` },
        params: {
          "email[regex]": value,
          // "name[regex]": value,
        },
      };
      getCustomer = services.get("/customer", config);
      getVendor = services.get("/vendor", config);
    }


    axios.all([getCustomer, getVendor])
      .then(axios.spread((...responses) => {
        const customersResponse = responses[0];
        const vendorsResponse = responses[1];
        //console.log(responses[0]);
        const allUsers = [...customersResponse.data.data, ...vendorsResponse.data.data];
        this.setState({
          searched: true,
          data: allUsers,
        });
        this.showUsers(allUsers, value);
      }))
      .catch((error) => {
        this.setState({ error: true });
        console.log(error);
      });
  };

  showUsers = (data, value) => {
    this.setState({ users: [] });
    this.setState((state) => {
      let list = [];
      for (let i = 0; i < data.length; i++) {
        let isActive = "Active";
        if (!data[i].isActive) isActive = "Inactive";
        list = list.concat([
          {
            key: i,
            name: data[i].name,
            email: data[i].email,
            type: data[i].__type,
            status: isActive,
            isSuspended: data[i].isSuspended,
            id: data[i]._id,
          },
        ]);
      }
      return {
        users: list,
        userEmpty: false,
      };
    });
  };



  suspendUserHandler = (id, apiURL, config, suspend) => {
    services.patch(apiURL, {isSuspended:suspend} , config)
      .then((response) => {
        console.log("res: ", response);
        this.searchRequest();
      })
      .catch((error) => {
        this.setState({ error: true });
        console.log(error);
      });
  };


  deleteUserHandler = (id, apiURL, config) => {
    services
      .delete(apiURL, config)
      .then((response) => {
        console.log("res: ", response);
        this.searchRequest();
      })
      .catch((error) => {
        this.setState({ error: true });
        console.log(error);
      });
  };

  actionHandler = (id, actionType) => {
    const config = {
      headers: { Authorization: `Bearer ${this.state.token}` },
    };

    const selectedUserId = this.state.users[id].id;
    let actionApi = "";

    if (this.state.users[id].type === "Customer") {
      actionApi = "/customer/" + selectedUserId;
    } else {
      actionApi = "/vendor/" + selectedUserId;
    }

    if(actionType === "delete") {
      this.setState({showPopup: false})
      this.deleteUserHandler(id, actionApi, config);
    } else if (actionType === "suspend") {
      this.suspendUserHandler(id, actionApi, config, true);
    } else if (actionType === "unsuspend") {
      this.suspendUserHandler(id, actionApi, config, false);
    }
  };

  searchUserHandler = (e, id) => {
    let result = [];
    const value = e.target.value;

    if (value !== "" && e.key === "Enter") {
      this.searchRequest(value);
    }
    else if (e.key === "Enter") this.searchRequest();
  };

  render() {
    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "E-mail",
        dataIndex: "email",
        key: "email",
      },
      {
        title: "Type",
        dataIndex: "type",
        key: "type",
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
      },
      {
        title: "Action",
        key: "action",
        render: (id, record) => (
          <Space size="large">
            <a
              className={classes.TableActionsSuspend}
              onClick={() => {
                record.isSuspended === false
                  ? this.actionHandler(record.key, "suspend")
                  : this.actionHandler(record.key, "unsuspend");
              }}
            >
              {record.isSuspended === false ? "Suspend" : "Unsuspend"}
            </a>
            <br />
            <a
              className={classes.TableActionsDelete}
              onClick={() => this.setState({id:record.key, actionType: "delete", showPopup: true, userName: record.email})}
            >
              Delete
            </a>
          </Space>
        ),
      },
    ];

    const users = this.state.users ? [this.state.users][0] : null;

    return (
      <div>
        {this.state.showPopup ?
          <PopUp
            clickYes={() => this.actionHandler(this.state.id, this.state.actionType)}
            clickNo={() => this.setState({showPopup: false})}
            buttonYes="Delete"
            buttonNo="Cancel"
            title={this.state.userName}
          />
          :
          <p />
        }
        <p>Search for users</p>
        <span className={classes.InputSpan}>
          <input
            className={classes.SearchInput}
            placeholder="user@mail.com"
            onKeyPress={(event) => this.searchUserHandler(event)}
          />
          <SearchOutlined className={classes.SearchIcon} />
        </span>
        <Table dataSource={users} columns={columns} />
      </div>
    );
  }
}
