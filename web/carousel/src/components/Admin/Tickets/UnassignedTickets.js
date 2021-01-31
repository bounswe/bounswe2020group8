import { useEffect, useState } from "react";
import TicketTable from "../../Account/Tickets/TicketTable";
import Ticket from "../../Account/Tickets/Ticket";
import services from "../../../apis/services";

const Tickets = (props) => {
  const [focusTicket, setFocusTicket] = useState(null);
  const [tickets, setTickets] = useState([]);

  useEffect(async () => {
    const TOKEN = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${TOKEN}` },
    };

    const resp = await services.get("/ticket/all/unassigned", config);

    setTickets(resp.data.data);
  }, [focusTicket]);

  const handleAssignMe = async (ticket) => {
    const TOKEN = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${TOKEN}` },
    };
    const adminInfo = await (await services.get("/admin/adminInfo", config))
      .data.data;

    const payload = {
      admin_id: adminInfo._id,
    };
    await services.patch(`/ticket/${ticket._id}`, payload, config);
  };

  const assignMeColumn = {
    title: "Action",
    key: "action",
    render: (text, record) => (
      <a onClick={() => handleAssignMe(record)}>Assign Me!</a>
    ),
  };

  const customerIdColumn = {
    title: "Client ID",
    key: "cid",
    dataIndex: "client_id",
  };

  return (
    <div>
      {focusTicket ? (
        <Ticket
          ticket={focusTicket}
          clearFocustTicket={() => setFocusTicket(null)}
          admin={true}
        />
      ) : (
        <TicketTable
          tickets={tickets}
          setFocusTicket={setFocusTicket}
          admin={true}
          setTickets={setTickets}
          extraTableColumns={[assignMeColumn, customerIdColumn]}
        />
      )}
    </div>
  );
};

export default Tickets;
