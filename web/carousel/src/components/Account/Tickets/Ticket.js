import classes from "./Ticket.module.css";
import { Input, Divider, message } from "antd";
import ButtonPrimary from "../../UI/ButtonPrimary/ButtonPrimary";
import ButtonSecondary from "../../UI/ButtonSecondary/ButtonSecondary";
import { useEffect, useState } from "react";
import services from "../../../apis/services";
import { white } from "material-ui/styles/colors";

const { TextArea } = Input;

const Ticket = ({ ticket, clearFocustTicket, admin }) => {
  const [reply, setReply] = useState("");
  const [myTicket, setMyTicket] = useState(null);

  const handleSubmit = async (reply) => {
    if (!reply) {
      message.info("Please enter an input");
      return;
    }
    const TOKEN = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${TOKEN}` },
    };

    const payload = { payload: reply };

    const resp = await services.post(`/ticket/${ticket._id}`, payload, config);

    setMyTicket(resp.data.data);
    setReply("");
  };

  const handleCloseTicket = async () => {
    const TOKEN = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${TOKEN}` },
    };

    console.log(TOKEN);

    const resp = await services.delete(`/ticket/${ticket._id}`, config);

    console.log(resp.data.data);
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

      <div
        style={{
          alignSelf: "center",
          width: "1000px",
          height: "80px",
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          borderRadius: "10px",
          justifyContent: "space-around",
          overflow: "hidden",
        }}
      >
        <span style={{ alignSelf: "center", fontSize: "30px" }}>
          {myTicket && myTicket.topic}
        </span>
        {myTicket && admin && (
          <span
            style={{
              alignSelf: "center",
              borderRadius: "5px",
            }}
          >
            Client ID: {myTicket.client_id}
          </span>
        )}
      </div>

      {myTicket &&
        myTicket.conversation.map((message) => {
          let style = {};
          if (message.isSentByAdmin ^ (admin !== true)) {
            style = {
              alignSelf: "flex-end",
            };
          }
          return (
            <div className={classes.MessageBox} style={style}>
              <p style={{ color: "gray" }}>
                {message.sendAt
                  .replace("T", " ")
                  .replace("Z", " ")
                  .slice(0, -5)}
              </p>
              <Divider />
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
        disabled={myTicket && !myTicket.isActive}
      />
      <div style={{ alignSelf: "center" }}>
        {admin && myTicket && myTicket.isActive && (
          <span>
            <ButtonSecondary
              title={"Close the Ticket"}
              onClick={handleCloseTicket}
            />
          </span>
        )}
        <span>
          {myTicket && myTicket.isActive && (
            <ButtonPrimary
              title={"Submit New Message"}
              style={{ width: 200 }}
              onClick={() => handleSubmit(reply)}
            />
          )}
        </span>
      </div>
    </div>
  );
};

export default Ticket;
