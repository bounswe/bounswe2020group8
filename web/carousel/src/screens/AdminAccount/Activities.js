import { useEffect, useState } from "react";
import services from "../../apis/services";

const Activities = (props) => {
  const [activities, setActivities] = useState([]);

  const getLastActivities = async () => {
    const TOKEN = localStorage.getItem("token");

    const config = {
      headers: { Authorization: `Bearer ${TOKEN}` },
    };

    const resp = await services.get("/admin/activity", config);
    const activities = resp.data.data;
    setActivities(
      activities
        .slice(Math.max(activities.length - 20, 0), activities.length)
        .reverse()
    );
  };

  useEffect(async () => {
    getLastActivities();
  }, []);

  return (
    <div>
      <div
        style={{
          width: "auto",
          fontSize: "40px",
          backgroundColor: "white",
          textAlign: "center",
          marginBottom: "10px",
        }}
      >
        ACTIVITIES
      </div>
      {activities.map((activity) => {
        return (
          <div style={{ width: "auto", backgroundColor: "white" }}>
            <pre>{JSON.stringify(activity, null, 2)}</pre>
          </div>
        );
      })}
    </div>
  );
};

export default Activities;
