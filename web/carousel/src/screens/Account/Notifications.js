import { withRouter } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import UserInfo from "../../components/Context/UserInfo";
import services from "../../apis/services";
import Table from "antd/lib/table";
import { IssuesCloseOutlined, LinkOutlined } from "@ant-design/icons";
const Notifications = (props) => {
  const [notifications, setNotifications] = useState([]);

  const refreshNotifications = async () => {
    const TOKEN = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${TOKEN}` },
    };
    const url = `/${user.userType.toLowerCase()}/notification`;
    const resp = await services.get(url, config);
    setNotifications(resp.data.data.reverse());
  };

  const handleMarkRead = async (notification) => {
    const TOKEN = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${TOKEN}` },
    };

    const url = `/${user.userType.toLowerCase()}/notification`;
    const payload = { notification_id: notification._id };
    const resp = await services.post(url, payload, config);
    setNotifications(resp.data.data.reverse());
    window.location.reload();
  };

  useEffect(() => {
    refreshNotifications();
  }, []);
  const user = useContext(UserInfo);

  const columns = [
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Time",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text, record) => {
        return text.replace("T", " ").replace("Z", " ").slice(0, -5);
      },
    },
    {
      title: "Link",
      dataIndex: "hyperlink",
      key: "hyperlink",
      render: (text, record) => {
        return (
          <a
            onClick={() => {
              handleMarkRead(record);
              props.history.push(text);
            }}
          >
            <LinkOutlined />
          </a>
        );
      },
    },
    {
      title: "",
      key: "markRead",
      render: (text, record) => {
        return record.isRead ? (
          <IssuesCloseOutlined />
        ) : (
          <a onClick={() => handleMarkRead(record)}>Mark as Read</a>
        );
      },
    },
  ];

  return (
    <div>
      <Table dataSource={notifications} columns={columns} />
    </div>
  );
};

export default withRouter(Notifications);
