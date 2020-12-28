import React from "react";
import { List, Avatar, Space } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { Form, Button, Input } from "antd";
import moment from "moment";
import services from "../../../../apis/services";

const TOKEN = localStorage.getItem("token");

const { TextArea } = Input;

const Editor = ({ onChange, onSubmit, submitting, value, myId }) => (
  <>
    <Form.Item>
      {myId != "" ? (
        <TextArea rows={4} onChange={onChange} value={value} />
      ) : (
        <TextArea
          rows={4}
          onChange={onChange}
          value={value}
          disabled={true}
          placeholder={"Login to Add Comment"}
        />
      )}
    </Form.Item>
    <Form.Item>
      {myId != "" ? (
        <Button
          htmlType="submit"
          loading={submitting}
          onClick={onSubmit}
          type="primary"
        >
          Add Comment
        </Button>
      ) : (
        <Button
          htmlType="submit"
          loading={submitting}
          onClick={onSubmit}
          type="primary"
          disabled={true}
        >
          Add Comment
        </Button>
      )}
    </Form.Item>
  </>
);
export default class CommentsComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      submitting: false,
      value: "",
      newComment: false,
      myId: "",
      myFullName: "",
    };
  }
  async componentWillMount() {
    let config = {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    };
    await services
      .get("/customer/me", config)
      .then((response) => {
        this.setState({
          myId: response.data.data._id,
          myFullName:
            response.data.data.name + " " + response.data.data.lastName,
        });
      })
      .catch((err, response) => {
        this.setState({ myId: "" });
      });
    if (this.state.comments.length == 0) {
      var comments = [];
      var getCommentsUrl =
        "/comment/" + this.props.product.parentProduct + "/all";
      await services.get(getCommentsUrl).then((response) => {
        var i = 0;
        for (i; i < response.data.data.length; i++) {
          var commentElement = {
            commentId: response.data.data[i]._id,
            customerId: response.data.data[i].customerId,
            text: response.data.data[i].text,
          };
          comments.push(commentElement);
        }
      });
      let k = 0;
      for (k; k < comments.length; k++) {
        let config = {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
          params: {
            _id: comments[k].customerId,
          },
        };
        await services
          .get("/customer", config)
          .then((response) => {
            comments[k].fullName =
              response.data.data[0].name + " " + response.data.data[0].lastName;
          })
          .catch((err, response) => {
            comments[k].fullName = "Login to see User Names";
          });
      }

      this.setState({ comments: comments });
    }
  }
  handleSubmit = () => {
    if (!this.state.value) {
      return;
    }
    if (this.state.myId == "") {
      this.setState({ value: "" });
      return;
    }
    var postUrl = "/comment/" + this.props.product.parentProduct;
    this.setState({
      submitting: true,
    });
    let postData = {
      text: this.state.value,
    };
    let config = {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    };

    services
      .post(postUrl, postData, config)
      .then((response) => {
        this.setState({
          submitting: false,
          value: "",
          comments: [
            {
              commentId: response.data.data._id,
              customerId: response.data.data.customerId,
              text: response.data.data.text,
              fullName: this.state.myFullName,
            },
            ...this.state.comments,
          ],
        });
      })
      .catch((err, response) => {});
  };

  handleChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  async handleDelete(item) {
    var deleteUrl = "/comment/" + this.props.product.parentProduct;
    await services
      .delete(deleteUrl, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
        data: {
          _id: item.commentId,
        },
      })
      .then((response) => {
        var comments = this.state.comments;
        var index = comments.indexOf(item);
        comments.splice(index, 1);
        this.setState({ comments: comments });
      })
      .catch((err, response) => {});
  }

  render() {
    const { myId, comments, submitting, value } = this.state;

    return (
      <div>
        <List
          itemLayout="vertical"
          size="large"
          pagination={{
            onChange: (page) => {},
            pageSize: 4,
          }}
          dataSource={comments}
          footer={
            <div>
              <b></b>
            </div>
          }
          renderItem={(item) => (
            <List.Item
              key={item.title}
              actions={[
                <Button
                  type="primary"
                  icon={<DeleteOutlined></DeleteOutlined>}
                  onClick={() => this.handleDelete(item)}
                  disabled={myId != item.customerId}
                ></Button>,
              ]}
            >
              <List.Item.Meta title={item.text} description={item.fullName} />
            </List.Item>
          )}
        />
        <br></br>
        <Editor
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
          submitting={submitting}
          value={value}
          myId={myId}
        />
      </div>
    );
  }
}
