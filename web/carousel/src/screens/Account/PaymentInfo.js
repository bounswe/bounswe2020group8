import React, { useState, useEffect } from "react";
import "./Account.css";
import "react-credit-cards/es/styles-compiled.css";

import {
  handleAddItem,
  handleRemoveItem,
  handleUpdateItem,
  getElements,
} from "../../apis/Account/Requests";

import { DeleteOutlined } from "@ant-design/icons";
import PaymentInfo from "../../components/Account/PaymentInfo/PaymentInfo";
import PaymentInfoHeadbar from "../../components/Account/PaymentInfo/PaymentInfoHeadbar";
import PaymentModal from "../../components/Account/PaymentInfo/PaymentModal";
import { AutoComplete } from "material-ui";

const PaymentInfoList = (props) => {
  const [creditCardList, setCreditCardList] = useState([]);

  const [modal, setModal] = useState({ visible: false });

  useEffect(() => {
    getElements("creditCards", setCreditCardList);
  }, []);

  return (
    <div className="account-page-container">
      <PaymentInfoHeadbar setModal={setModal} />
      {modal.visible ? (
        <PaymentModal
          visible={true}
          edit={modal.edit}
          creditCard={modal.creditCard}
          setModal={setModal}
          handleAddCreditCard={(newCreditCard) =>
            handleAddItem(
              "creditCards",
              setCreditCardList,
              creditCardList,
              newCreditCard
            )
          }
        />
      ) : null}
      <div>
        {creditCardList.map((creditCard) => {
          return (
            <div style={{ margin: "40px", display: "inline-block" }}>
              <PaymentInfo
                key={creditCard.id}
                creditCard={creditCard}
                setModal={setModal}
                handleDelete={(creditCard) =>
                  handleRemoveItem(
                    "creditCards",
                    setCreditCardList,
                    creditCardList,
                    creditCard._id
                  )
                }
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PaymentInfoList;
