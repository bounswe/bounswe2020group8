import React from "react";
import { List, Avatar } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
const data = [
  {
    title: "Ant Design Title 1",
  },
  {
    title: "Ant Design Title 2",
  },
  {
    title: "Ant Design Title 3",
  },
  {
    title: "Ant Design Title 4",
  },
];

export default class OtherSellersComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: "",
    };
  }
  componentWillMount() {
    console.log(this.props.product);
    console.log(this.props.mainProduct);
  }

  render() {
    return (
      <div>
        {" "}
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <br></br>
              <br></br>
              <List.Item.Meta
                avatar={<ShoppingCartOutlined />}
                title={<a href="https://ant.design">{item.title}</a>}
                description="{this.state.message}"
              />
              <br></br>
              <br></br>
            </List.Item>
          )}
        />
        ,{" "}
      </div>
    );
  }
}
