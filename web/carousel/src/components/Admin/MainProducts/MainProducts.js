import React, { Component } from "react";
import services from "../../../apis/services";
import {Space} from "antd";
import classes from "../ProductRequests/ProductRequests.module.css";
import Table from "antd/lib/table";
import {SearchOutlined} from "@ant-design/icons";
import handleSubmit from "../../UI/ConfirmPopup/ConfirmPopup";

const TOKEN = localStorage.getItem("token");
const config = {
  headers: { Authorization: `Bearer ${TOKEN}` },
};

export default class Products extends Component {
  constructor(props) {
    super(props);
    this.state =
      {
        products: null,
        listChildProducts: false,
        listMainProducts: true,
        baseProducts: null,
        loading: false,
      };
  }

  componentDidMount() {
    this.getAllMainProducts();
  }

  getAllMainProducts = () => {
    this.setState({loading: true});
    services.get("/mainProduct", config)
      .then(response => {
        this.showProducts(response.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  showProducts = (data) => {
    let list = [];
    console.log(data);

    if(data.length === 0) this.setState({loading:false});
    for (let i = 0; i < data.length; i++) {
      let params = [];
      for (let k = 0; k < data[i].parameters.length; k++) {
        let str = data[i].parameters[k].name + ": " + data[i].parameters[k].values;
        params = params.concat(str);
      }
      const createdAt = data[i].createdAt.substring(0,10);
      const updatedAt = data[i].updatedAt.substring(0,10);
      let tags = [];
      for (let j = 0; j < data[i].tags.length; j++) {
        tags = [...tags, data[i].tags[j]];
        tags = [...tags, ", "];
      }
      console.log(tags);
      services.get("/mainProduct/" + data[i]._id, config)
        .then(response => {
          const product = response.data.data;
          this.setState((state) => {
            list = list.concat([
              {
                key: i,
                title: product.title,
                brand: product.brand,
                category: product.category,
                parameters: params.join(", "),
                id: data[i]._id,
                tags: tags,
                desc: data[i].description,
                created: createdAt,
                updated: updatedAt,
              },
            ]);
            return {
              baseProducts: list,
              products: list,
              loading: false,
            };
          });
        })
        .catch(error => {
          console.log(error);
        })

    }
  }
  searchProductHandler = (e) => {
    const value = e.target.value;

    if (value !== "" && e.key === "Enter") {
      const filterTable = this.state.baseProducts.filter(o => o.title.toLowerCase().includes(value.toLowerCase()));
      this.setState({products: filterTable});
    } else if (value === "" && e.key === "Enter") {
      this.setState({products: this.state.baseProducts});
    }
  }

  deleteProductHandler = (product) => {
    console.log(product);
    services.delete("/mainProduct/" + product.id, config)
      .then(response => {
        console.log(response);
        this.getAllMainProducts();
      })
      .catch(error => {
        console.log(error);
      })
  }

  render() {

    const columns = [
      {
        title: "Title",
        dataIndex: "title",
        key: "title",
      },
      {
        title: "Brand",
        dataIndex: "brand",
        key: "brand",
      },
      {
        title: "Category",
        dataIndex: "category",
        key: "category",
      },
      {
        title: "Parameters",
        dataIndex: "parameters",
        key: "parameters",
      },
      {
        title: "Tags",
        dataIndex: "tags",
        key: "tags",
      },
      {
        title: "Description",
        dataIndex: "desc",
        key: "desc",
      },
      {
        title: "Creation",
        dataIndex: "created",
        key: "created",
      },
      {
        title: "Last Update",
        dataIndex: "updated",
        key: "updated",
      },
      {
        title: "Actions",
        key: "action",
        render: (id, record) => (
          <Space size="large">
            <a
              className={classes.TableActionsSuspend}
              onClick={() => {
                handleSubmit(
                  "Are you sure to delete this main product?",
                  () => this.deleteProductHandler(record)
                );
              }}
              //onClick={() => { this.deleteProductHandler(record);}}
            >
              Delete
            </a>
            <br />
          </Space>
        ),
      },
    ];

    let data = this.state.products;
    return (
      <div>
        <span className={classes.InputSpan}>
          <input
            className={classes.SearchInput}
            placeholder="Product title..."
            onKeyPress={(event) => this.searchProductHandler(event)}
          />
          <SearchOutlined className={classes.SearchIcon} />
        </span>
        <Table dataSource={data} loading={this.state.loading} scroll={{x: true}} columns={columns}/>
      </div>
    );
  }
}