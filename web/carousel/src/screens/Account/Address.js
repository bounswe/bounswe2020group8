import React, { useEffect, useState } from "react";
import "./Account.css";

import {
  handleAddItem,
  handleRemoveItem,
  handleUpdateItem,
  getElements,
} from "../../apis/Account/Requests";

import Address from "../../components/Account/Address/Address";
import AddressHeadbar from "../../components/Account/Address/AddressHeadbar";
import AddressModal from "../../components/Account/Address/AddressModal";

const AddressList = (props) => {
  const [addressList, setAddressList] = useState([]);

  const [modal, setModal] = useState({
    visible: false,
    edit: false,
    address: {},
  });

  useEffect(() => {
    setAddressList(getElements("addresses", setAddressList));
  }, []);

  // var addressList = [];
  // for (var i = 0; i < 15; i++) {
  //   addressList.push({
  //     id: i,
  //     title: "Home",
  //     firstName: "Yasin",
  //     lastName: "Kaya",
  //     phone: "5545342432",
  //     phonePrefix: "90",
  //     details: "Gumus Mahallesi, Baris sokak No: 6, daire: 7 Adalar/Istanbul",
  //   });
  // }

  return (
    <div className="account-page-container">
      <AddressHeadbar setModal={setModal} />
      {modal.visible ? (
        <AddressModal
          visible={true}
          edit={modal.edit}
          address={modal.address}
          setModal={setModal}
          handleAddAddress={(newAddress) =>
            handleAddItem("addresses", setAddressList, addressList, newAddress)
          }
          handleUpdateAddress={(updatedAddress) =>
            handleUpdateItem(
              "addresses",
              setAddressList,
              addressList,
              updatedAddress
            )
          }
        />
      ) : null}
      {addressList
        ? addressList.map((address) => {
            return (
              <Address
                key={address.id}
                address={address}
                setModal={setModal}
                handleDelete={(address) =>
                  handleRemoveItem(
                    "addresses",
                    setAddressList,
                    addressList,
                    address.id
                  )
                }
              />
            );
          })
        : null}
    </div>
  );
};

export default AddressList;
