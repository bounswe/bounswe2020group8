import classes from "./Ticket.module.css";
import { Input } from "antd";
import ButtonPrimary from "../../UI/ButtonPrimary/ButtonPrimary";
import ButtonSecondary from "../../UI/ButtonSecondary/ButtonSecondary";
import { useEffect, useState } from "react";
import services from "../../../apis/services";
// import confirmPopup from "../../UI/ConfirmPopup/ConfirmPopup";

const { TextArea } = Input;

const Ticket = ({ ticket, clearFocustTicket }) => {
  const [reply, setReply] = useState("");
  const [myTicket, setMyTicket] = useState(null);

  const handleSubmit = async (reply) => {
    const TOKEN = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${TOKEN}` },
    };

    console.log(reply);
    const payload = { payload: reply };
    console.log(ticket);
    const resp = await services.post(`/ticket/${ticket._id}`, payload, config);
    setMyTicket(resp.data.data);
    setReply("");
  };

  useEffect(() => {
    setMyTicket(ticket);
  }, [ticket]);

  return (
    <div className={classes.MessageArea}>
      <span>
        <ButtonSecondary
          title={"Go Back to All Tickets"}
          onClick={clearFocustTicket}
        />
      </span>

      {myTicket &&
        myTicket.conversation.map((message) => {
          let style = {};
          if (message.isSentByAdmin === false) {
            style = {
              alignSelf: "flex-end",
            };
          }
          return (
            <div className={classes.MessageBox} style={style}>
              {message.payload}
            </div>
          );
        })}

      <TextArea
        style={{
          alignSelf: "center",
          width: "800px",
          margin: "30px",
          padding: "10px",
        }}
        value={reply}
        onChange={(e) => setReply(e.target.value)}
        rows={4}
      />
      <div style={{ alignSelf: "center" }}>
        <span>
          <ButtonSecondary title={"Close the Ticket"} />
        </span>
        <span>
          <ButtonPrimary
            title={"Submit New Message"}
            style={{ width: 200 }}
            onClick={() => handleSubmit(reply)}
          />
        </span>
      </div>
    </div>
  );
};

export default Ticket;
