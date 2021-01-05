import { useEffect, useState } from "react";

import PaymentInfo from "../Account/PaymentInfo/PaymentInfo";
import PaymentModal from "../Account/PaymentInfo/PaymentModal";
import Address from "../Account/Address/Address";
import AddressModal from "../Account/Address/AddressModal";
import { PlusOutlined } from "@ant-design/icons";

import {
  handleAddItem,
  handleRemoveItem,
  handleUpdateItem,
  getElements,
} from "../../apis/Account/Requests";
import classes from "./Order.module.css";

const Order = (props) => {
  const [addresses, setAddresses] = useState(null);
  const [creditCards, setCreditCards] = useState(null);
  const [addressModal, setAddressModal] = useState({
    visible: false,
    edit: false,
    address: {},
  });
  const [creditCardModal, setCreditCardModal] = useState({
    visible: false,
    edit: false,
    creditCard: {},
  });
  const [orderAddressId, setOrderAddressId] = useState(null);
  const [orderCreditCardId, setOrderCreditCardId] = useState(null);

  useEffect(() => {
    getElements("addresses", setAddresses);
    getElements("creditCards", setCreditCards);
  }, []);

  return (
    <div>
      <div className={classes.Box}>
        <div className={classes.BoxHeader}>
          Please Select the Shipment Address
        </div>
        <div>
          {addressModal.visible ? (
            <AddressModal
              visible={true}
              edit={addressModal.edit}
              address={addressModal.address}
              setModal={setAddressModal}
              handleAddAddress={(newAddress) =>
                handleAddItem("addresses", setAddresses, addresses, newAddress)
              }
              handleUpdateAddress={(updatedAddress) =>
                handleUpdateItem(
                  "addresses",
                  setAddresses,
                  addresses,
                  updatedAddress
                )
              }
            />
          ) : null}

          <div>
            <div
              className={classes.AddressBox}
              onClick={() => {
                setAddressModal({ visible: true, edit: false, address: {} });
              }}
            >
              <div style={{ lineHeight: "300px" }}>
                <PlusOutlined />
              </div>
            </div>
            {addresses
              ? addresses.map((address) => {
                  return (
                    <Address
                      key={address._id}
                      address={address}
                      setModal={setAddressModal}
                      isOrder={true}
                      onChangeValue={(e) =>
                        props.setOrderAddress(
                          addresses.filter(
                            (address) => address._id == e.currentTarget.value
                          )[0]
                        )
                      }
                      handleDelete={null}
                      isSelected={address.name === "Evim"}
                    />
                  );
                })
              : null}
          </div>
        </div>
      </div>
      <div className={classes.Box}>
        <div className={classes.BoxHeader}>Please Select the Credit Card</div>
        <div
          className={classes.AddCreditCard}
          onClick={() => {
            setCreditCardModal({ visible: true });
          }}
        >
          <div style={{ lineHeight: "210px" }}>
            <PlusOutlined />
          </div>
        </div>
        {creditCardModal.visible ? (
          <PaymentModal
            visible={true}
            edit={creditCardModal.edit}
            creditCard={creditCardModal.creditCard}
            setModal={setCreditCardModal}
            handleAddCreditCard={(newCreditCard) =>
              handleAddItem(
                "creditCards",
                setCreditCards,
                creditCards,
                newCreditCard
              )
            }
          />
        ) : null}

        {creditCards
          ? creditCards.map((creditCard) => {
              return (
                <div className={classes.CreditCardBox}>
                  <input
                    type="radio"
                    name="orderCreditCard"
                    value={creditCard._id}
                    onChange={(e) => {
                      props.setOrderCreditCard(
                        creditCards.filter(
                          (creditCard) =>
                            creditCard._id == e.currentTarget.value
                        )[0]
                      );
                    }}
                  />
                  <PaymentInfo
                    key={creditCard.id}
                    creditCard={creditCard}
                    handleDelete={(creditCard) =>
                      handleRemoveItem(
                        "creditCards",
                        setCreditCards,
                        creditCards,
                        creditCard._id
                      )
                    }
                  />
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default Order;
