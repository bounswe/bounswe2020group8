import Table from "antd/lib/table";
import { useState } from "react";
import ButtonPrimary from "../../UI/ButtonPrimary/ButtonPrimary";
import ButtonSecondary from "../../UI/ButtonSecondary/ButtonSecondary";
import TicketModal from "./TicketModal";

const TicketTable = ({ tickets, setFocusTicket }) => {
  const [modal, setModal] = useState({ visible: false });
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Creation Time",
      dataIndex: "createdAt",
      key: "createdAt",
    },
  ];
  return (
    <div>
      {modal.visible ? (
        <TicketModal setModal={setModal} visible={true} />
      ) : null}
      <span>
        <ButtonSecondary
          title={"Create New Ticket"}
          style={{ width: 200 }}
          onClick={() => setModal({ visible: true })}
        />
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
