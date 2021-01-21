import { useState } from "react";
import TicketTable from "../../../components/Account/Tickets/TicketTable";
import Ticket from "../../../components/Account/Tickets/Ticket";
const Tickets = (props) => {
  const [focusTicket, setFocusTicket] = useState(null);

  const tickets = [
    {
      id: 1,
      title: "Teknosa urunu gondermedi :(",
      createdAt: "12-20-20",
      messages: [
        {
          sender: "you",
          message:
            "Teknosadan bir urun aldim, 45 gundur bekliyorum. Teknosayla direk iletisime gecmeye calistim ama artik benim ismimi duyunca direk telefonu kapatiyorlar. Urunu filan istemiyorum, parasini versinler yeter! Lutfen bana yardimci olun bu konu hakkinda",
        },
        {
          sender: "carousel",
          message:
            "Merhaba kerim bey\n Mesajinizi aldik, en yakin zamanda sizinle bu konu hakkinda bir donus yapacagiz.\n Tesekkurler\n Carousel Admin Takimi",
        },
      ],
    },
    { id: 2, title: "Vatan Computer parami caldi", createdAt: "13-32-20" },
    { id: 3, title: "Urun elime ulasmadi", createdAt: "12-11-20" },
  ];

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
          admin={true}
        />
      )}
    </div>
  );
};

export default Tickets;
