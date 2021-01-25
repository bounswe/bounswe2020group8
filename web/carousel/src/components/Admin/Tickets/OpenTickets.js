import { useState, useEffect } from "react";
import TicketTable from "../../../components/Account/Tickets/TicketTable";
import Ticket from "../../../components/Account/Tickets/Ticket";
import services from "../../../apis/services";

const Tickets = (props) => {
  const [focusTicket, setFocusTicket] = useState(null);
  const [tickets, setTickets] = useState([]);

  useEffect(async () => {
    const TOKEN = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${TOKEN}` },
    };
    const adminInfo = await (await services.get("/admin/adminInfo", config))
      .data.data;
    const admin_id = adminInfo._id;

    console.log(admin_id);

    const resp = await services.get(`/ticket/all/admin/${admin_id}`, config);

    setTickets(resp.data.data);
  }, [focusTicket]);

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
          extraTableColumns={[customerIdColumn]}
        />
      )}
    </div>
  );
};

export default Tickets;
