import React, { useState } from "react";
import "./Account.css";
import "react-credit-cards/es/styles-compiled.css";

import { DeleteOutlined } from "@ant-design/icons";
import PaymentInfo from "../../components/Account/PaymentInfo/PaymentInfo";
import PaymentInfoHeadbar from "../../components/Account/PaymentInfo/PaymentInfoHeadbar";
import PaymentModal from "../../components/Account/PaymentInfo/PaymentModal";

const PaymentInfoList = (props) => {
  const [modal, setModal] = useState({ visible: false });

  var creditCardList = [];
  for (var i = 0; i < 15; i++) {
    creditCardList.push({
      id: i,
      name: "Yasin Kaya",
      cardNumber: i % 2 === 1 ? "4123456789012345" : "5123456789012345",
      cvc: "123",
      expiry: "10/22",
    });
  }

  return (
    <div className="account-page-container">
      <PaymentInfoHeadbar setModal={setModal} />
      {modal.visible ? (
        <PaymentModal
          visible={true}
          edit={modal.edit}
          creditCard={modal.creditCard}
          setModal={setModal}
        />
      ) : null}
      {creditCardList.map((creditCard) => {
        return (
          <PaymentInfo
            key={creditCard.id}
            creditCard={creditCard}
            setModal={setModal}
          />
        );
      })}
    </div>
  );
};

export default PaymentInfoList;
