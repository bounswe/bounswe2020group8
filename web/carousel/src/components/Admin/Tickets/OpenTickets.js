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

    const admin_id = "5fd7c73a644d7079ea8f61ef";

    const resp = await services.get(`/ticket/all/admin/${admin_id}`, config);

    setTickets(resp.data.data);
  }, [focusTicket]);

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
        />
      )}
    </div>
  );
};

export default Tickets;
