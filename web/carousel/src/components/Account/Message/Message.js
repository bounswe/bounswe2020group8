import { SocialSentimentSatisfied } from "material-ui/svg-icons";
import { useEffect, useState, useContext } from "react";
import { useParams, withRouter } from "react-router-dom";
import services from "../../../apis/services";
import UserInfo from "../../Context/UserInfo";
import { Input, Divider, message } from "antd";
import ButtonPrimary from "../../UI/ButtonPrimary/ButtonPrimary";
import ButtonSecondary from "../../UI/ButtonSecondary/ButtonSecondary";
import classes from "./Message.module.css";

const { TextArea } = Input;

const Message = (props) => {
  const { orderId, subOrderId, vendorId } = useParams();
  const [isActive, setIsActive] = useState(null);
  const [message, setMessage] = useState([]);
  const [reply, setReply] = useState("");
  const user = useContext(UserInfo);

  const handleSubmit = async (reply) => {
    if (!reply) {
      message.info("Please enter an input");
      return;
    }
    const TOKEN = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${TOKEN}` },
    };

    if (isActive !== true) {
      const payload = {
        order_id: orderId,
        suborder_id: subOrderId,
        vendor_id: vendorId,
        payload: reply,
      };

      const resp = await services.post("/orderMessage/create", payload, config);
      setIsActive(true);
      setReply("");
      setMessage(resp.data.data);
    } else {
      const payload = {
        payload: reply,
      };
      try {
        const resp = await services.post(
          `/orderMessage/${message._id}`,
          payload,
          config
        );
        setReply("");
        setMessage(resp.data.data);
      } catch {
        // window.location.reload();
      }
    }
  };

  const handleCloseMessage = async () => {
    const TOKEN = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${TOKEN}` },
    };

    const resp = await services.delete(`/orderMessage/${message._id}`, config);

    setMessage(resp.data.data);
    setReply("");
  };

  useEffect(async () => {
    const TOKEN = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${TOKEN}` },
    };

    const url = "/orderMessage/all";
    let payload = { order_id: orderId, suborder_id: subOrderId };
    let resp = await services.post(url, payload, config);

    console.log(resp.data.data);
    try {
      if (resp.data.data.length === 0) {
        setIsActive(false);
      } else {
        setIsActive(true);
        setMessage(resp.data.data[0]);
      }
    } catch {
      setIsActive(false);
    }
  }, []);

  return (
    <div className={classes.MessageArea}>
      <span>
        <ButtonSecondary
          title={"Go Back to All Messages"}
          onClick={() => props.history.push("/account/messages")}
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
        {message && (
          <span
            style={{
              alignSelf: "center",
              borderRadius: "5px",
            }}
          >
            Order ID: {message.order_id}
          </span>
        )}
      </div>

      {message &&
        message.conversation &&
        message.conversation.map((m) => {
          let style = {};
          if (m.isSentByVendor ^ (user.userType === "Customer")) {
            style = {
              alignSelf: "flex-end",
            };
          }
          return (
            <div className={classes.MessageBox} style={style}>
              <p style={{ color: "gray" }}>
                {m.sendAt.replace("T", " ").replace("Z", " ").slice(0, -5)}
              </p>
              <Divider />
              {m.payload}
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
        disabled={message && message.isActive === false}
      />
      <div style={{ alignSelf: "center" }}>
        {isActive === true && message && message.isActive === true && (
          <span>
            <ButtonSecondary
              title={"Close the Message"}
              onClick={handleCloseMessage}
            />
          </span>
        )}

        <span>
          {message && (
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

export default withRouter(Message);
