import Table from "antd/lib/table";
import { useState } from "react";
import ButtonPrimary from "../../UI/ButtonPrimary/ButtonPrimary";
import ButtonSecondary from "../../UI/ButtonSecondary/ButtonSecondary";
import TicketModal from "./TicketModal";

const TicketTable = ({ tickets, setFocusTicket, admin, setTickets }) => {
  const [modal, setModal] = useState({ visible: false });
  const columns = [
    {
      title: "Title",
      dataIndex: "topic",
      key: "topic",
    },
    {
      title: "Creation Time",
      dataIndex: "startedAt",
      key: "startedAt",
    },
  ];
  return (
    <div>
      {modal.visible ? (
        <TicketModal
          setModal={setModal}
          visible={true}
          setTickets={setTickets}
        />
      ) : null}
      <span>
        {!admin ? (
          <ButtonSecondary
            title={"Create New Ticket"}
            style={{ width: 200 }}
            onClick={() => setModal({ visible: true })}
          />
        ) : null}
      </span>
      <Table
        dataSource={tickets}
        columns={columns}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              setFocusTicket(record);
            },
          };
        }}
      />
    </div>
  );
};

export default TicketTable;
