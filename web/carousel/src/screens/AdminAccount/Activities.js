import { useEffect, useState } from "react";
import services from "../../apis/services";
import { Card } from "antd";
import { Collapse } from "antd";
import { List } from "antd";

const { Panel } = Collapse;

const Activities = (props) => {
  const [activities, setActivities] = useState([]);

  const getLastActivities = async () => {
    const TOKEN = localStorage.getItem("token");

    const config = {
      headers: { Authorization: `Bearer ${TOKEN}` },
      params: { limit: 50 },
    };

    const resp = await services.get("/admin/activity", config);
    const activities = resp.data.data;
    setActivities(activities);
  };

  useEffect(async () => {
    getLastActivities();
  }, []);

  const getActorData = (activity) => {
    return [
      {
        title: "ID",
        value: activity.actor._id,
      },
      {
        title: "Type",
        value: activity.actor.type,
      },
      {
        title: "Name",
        value: activity.actor.name,
      },
      {
        title: "URL",
        value: activity.actor.url,
      },
    ];
  };
  const getObjectData = (activity) => {
    return [
      {
        title: "Type",
        value: activity.object.type,
      },
      {
        title: "URL",
        value: activity.object.url,
      },
    ];
  };

  return (
    <div>
      {activities.map((activity) => {
        return (
          <div
            style={{ width: "auto", backgroundColor: "white", height: "auto" }}
          >
            <Card
              title={activity.summary}
              bordered={false}
              style={{ width: "auto", margin: "15px" }}
            >
              <Collapse>
                <Panel header="Actor" key="actor">
                  <List
                    itemLayout="horizantal"
                    dataSource={getActorData(activity)}
                    renderItem={(item) => (
                      <List.Item>
                        <List.Item.Meta
                          title={item.title}
                          description={item.value}
                        />
                      </List.Item>
                    )}
                  />
                </Panel>
                <Panel header="Object" key="object">
                  <List
                    itemLayout="horizantal"
                    dataSource={getObjectData(activity)}
                    renderItem={(item) => (
                      <List.Item>
                        <List.Item.Meta
                          title={item.title}
                          description={item.value}
                        />
                      </List.Item>
                    )}
                  />
                </Panel>

                <Panel header="Published At" key="time">
                  <List
                    itemLayout="horizantal"
                    dataSource={[
                      {
                        title: "Time in UTC",
                        value: activity.published,
                      },
                    ]}
                    renderItem={(item) => (
                      <List.Item>
                        <List.Item.Meta
                          title={item.title}
                          description={item.value}
                        />
                      </List.Item>
                    )}
                  />
                </Panel>

                <Panel header="Context" key="context">
                  <a>https://www.w3.org/ns/activitystreams</a>
                </Panel>
              </Collapse>
            </Card>
          </div>
        );
      })}
    </div>
  );
};

export default Activities;
