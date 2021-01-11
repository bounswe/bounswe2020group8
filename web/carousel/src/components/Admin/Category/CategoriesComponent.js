import { Tag, Input } from "antd";
import { TweenOneGroup } from "rc-tween-one";
import { PlusOutlined } from "@ant-design/icons";
import React from "react";
import services from "../../../apis/services";
import "./CategoriesComponent.module.css";

const TOKEN = localStorage.getItem("token");

export default class CategoriesComponent extends React.Component {
  state = {
    tags: [],
    inputVisible: false,
    inputValue: "",
    categoryIdDic: {},
  };

  async componentWillMount() {
    let config = {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    };
    await services
      .get("/category", config)
      .then((response) => {
        let categoryList = response.data.data;
        let category_arr = [];
        let category_id_dic = {};
        categoryList.forEach((element) => {
          if (typeof element["name"] != "undefined") {
            category_arr.push(element["name"]);
            category_id_dic[element["name"]] = element["_id"];
          }
        });
        this.setState({ tags: category_arr });
        this.setState({ categoryIdDic: category_id_dic });
      })
      .catch((err, response) => {
        console.log(err);
        this.setState({ isError: true });
      });
  }
  handleClose = (removedTag) => {
    let id = this.state.categoryIdDic[removedTag];
    let config = {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    };
    services
      .delete("/category/" + id, config)
      .then((response) => {})
      .catch((err, response) => {});
    const tags = this.state.tags.filter((tag) => tag !== removedTag);
    delete this.state.categoryIdDic[removedTag];
    this.setState({ tags });
  };

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };

  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value });
  };

  handleInputConfirm = () => {
    const { inputValue } = this.state;
    let postData = {
      name: inputValue,
    };
    let config = {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    };
    services
      .post("/category", postData, config)
      .then((response) => {
        this.state.categoryIdDic[inputValue] = response.data.data["_id"];
      })
      .catch((err, response) => {});
    let { tags } = this.state;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }
    this.setState({
      tags,
      inputVisible: false,
      inputValue: "",
    });
  };

  saveInputRef = (input) => {
    this.input = input;
  };

  forMap = (tag) => {
    const tagElem = (
      <Tag
        closable
        onClose={(e) => {
          e.preventDefault();
          this.handleClose(tag);
        }}
      >
        {tag}
      </Tag>
    );
    return (
      <span key={tag} style={{ display: "inline-block" }}>
        {tagElem}
      </span>
    );
  };

  render() {
    const { tags, inputVisible, inputValue } = this.state;
    const tagChild = tags.map(this.forMap);
    return (
      <>
        <div style={{ marginBottom: 16 }}>
          <TweenOneGroup
            enter={{
              scale: 0.8,
              opacity: 0,
              type: "from",
              duration: 100,
              onComplete: (e) => {
                e.target.style = "";
              },
            }}
            leave={{ opacity: 0, width: 0, scale: 0, duration: 200 }}
            appear={false}
          >
            {tagChild}
          </TweenOneGroup>
        </div>
        {inputVisible && (
          <Input
            ref={this.saveInputRef}
            type="text"
            size="small"
            style={{ width: 78 }}
            value={inputValue}
            onChange={this.handleInputChange}
            onBlur={this.handleInputConfirm}
            onPressEnter={this.handleInputConfirm}
          />
        )}
        {!inputVisible && (
          <Tag onClick={this.showInput} className="site-tag-plus">
            <PlusOutlined /> New Category
          </Tag>
        )}
      </>
    );
  }
}
