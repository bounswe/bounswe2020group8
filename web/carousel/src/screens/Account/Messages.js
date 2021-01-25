import { useEffect, useState, useContext } from "react";
import services from "../../apis/services";
import UserInfo from "../../components/Context/UserInfo";
import Table from "antd/lib/table";
import ButtonSecondary from "../../components/UI/ButtonSecondary/ButtonSecondary";

const Messages = (props) => {
  const user = useContext(UserInfo);
  const [messages, setMessages] = useState([]);
  const [extendedMessages, setExtendedMessages] = useState([]);
  const columns = [
    { title: "Vendor", dataIndex: "vendor_name", key: "vendor_name" },
    {
      title: "Order ID",
      dataIndex: "order_id",
      key: "order_id",
    },
    {
      title: "Creation Time",
      dataIndex: "startedAt",
      key: "startedAt",
      render: (text, record) => {
        return text.replace("T", " ").replace("Z", " ").slice(0, -5);
      },
    },
  ];

  const getVendorName = async (vendorId) => {
    const resp = await services.get(`/vendor/public/${vendorId}`);
    return resp.data.data.companyName;
  };

  const getExtendedMessages = async (messages) => {
    return Promise.all(
      messages.map(async (m) => {
        getVendorName(m.vendor_id);
        return { ...m, vendor_name: await getVendorName(m.vendor_id) };
      })
    );
  };

  useState(() => {}, [messages]);

  useEffect(async () => {
    const TOKEN = localStorage.getItem("token");
    console.log(TOKEN);

    const config = {
      headers: { Authorization: `Bearer ${TOKEN}` },
    };

    const resp = await services.get("/orderMessage", config);
    getExtendedMessages(resp.data.data).then((extendedMessages) => {
      setExtendedMessages(extendedMessages);
    });
  }, []);

  const prefix = user.userType === "Vendor" ? "/vendor" : "";

  return (
    <div>
      <Table
        dataSource={extendedMessages}
        columns={columns}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              props.history.push(
                `${prefix}/account/messages/${record.order_id}/${record.suborder_id}/${record.vendor_id}`
              );
            },
          };
        }}
      />
    </div>
  );
};

export default Messages;
