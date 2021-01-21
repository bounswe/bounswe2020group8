import classes from "./Ticket.module.css";
import { Input } from "antd";
import ButtonPrimary from "../../UI/ButtonPrimary/ButtonPrimary";
import ButtonSecondary from "../../UI/ButtonSecondary/ButtonSecondary";
// import confirmPopup from "../../UI/ConfirmPopup/ConfirmPopup";

const { TextArea } = Input;

const Ticket = ({ ticket, clearFocustTicket }) => {
  return (
    <div className={classes.MessageArea}>
      <span>
        <ButtonSecondary
          title={"Go Back to All Tickets"}
          onClick={clearFocustTicket}
        />
      </span>

      {ticket.messages.map((message) => {
        let style = {};
        if (message.sender !== "carousel") {
          style = {
            alignSelf: "flex-end",
          };
        }
        return (
          <div className={classes.MessageBox} style={style}>
            {message.message}
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
        rows={4}
      />
      <div style={{ alignSelf: "center" }}>
        <span>
          <ButtonSecondary title={"Close the Ticket"} />
        </span>
        <span>
          <ButtonPrimary title={"Submit New Message"} style={{ width: 200 }} />
        </span>
      </div>
    </div>
  );
};

export default Ticket;
