import { useEffect, useState, useContext } from "react";
import TicketTable from "../../components/Account/Tickets/TicketTable";
import Ticket from "../../components/Account/Tickets/Ticket";
import services from "../../apis/services";
import UserInfo from "../../components/Context/UserInfo";

const Tickets = (props) => {
  const [focusTicket, setFocusTicket] = useState(null);
  const [tickets, setTickets] = useState([]);
  const user = useContext(UserInfo);

  useEffect(async () => {
    const TOKEN = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${TOKEN}` },
    };

    let resp = await services.get(`/${user.userType.toLowerCase()}/me`, config);
    const cid = resp.data.data._id;

    resp = await services.get(`/ticket/client/${cid}`, config);

    setTickets(resp.data.data);
  }, []);

  return (
    <div>
      {focusTicket ? (
        <Ticket
          ticket={focusTicket}
          clearFocustTicket={() => setFocusTicket(null)}
        />
      ) : (
        <TicketTable
          tickets={tickets}
          setFocusTicket={setFocusTicket}
          setTickets={setTickets}
        />
      )}
    </div>
  );
};

export default Tickets;
