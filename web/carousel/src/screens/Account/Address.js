import React, { Component } from "react";
import "./Account.css";

import Address from "../../components/Account/Address/Address";
import AddressHeadbar from "../../components/Account/Address/AddressHeadbar";

const addressList = (props) => {
  const addressList = [
    {
      title: "Home",
      firstName: "Yasin",
      lastName: "Kaya",
      phone: "05545342432",
      details: "Gumus Mahallesi, Baris sokak No: 6, daire: 7 Adalar/Istanbul",
    },
  ];
  return (
    <div className="account-page-container">
      <AddressHeadbar />
      <Address address={addressList[0]} />
      <Address address={addressList[0]} />
      <Address address={addressList[0]} />
      <Address address={addressList[0]} />
      <Address address={addressList[0]} />
      <Address address={addressList[0]} />
      <Address address={addressList[0]} />
      <Address address={addressList[0]} />
      <Address address={addressList[0]} />
      <Address address={addressList[0]} />
      <Address address={addressList[0]} />
      <Address address={addressList[0]} />
      <Address address={addressList[0]} />
    </div>
  );
};

export default addressList;
