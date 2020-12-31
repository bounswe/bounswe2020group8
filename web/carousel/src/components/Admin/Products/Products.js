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
    this.getAllProducts();
  }

  getAllProducts = () => {
    this.setState({loading: true});
    services.get("/product", config)
      .then(response => {
        this.showProducts(response.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  showProducts = (data) => {
    let list = [];
    if(data.length === 0) this.setState({loading:false});
    for (let i = 0; i < data.length; i++) {
      let params = [];
      for (let k = 0; k < data[i].parameters.length; k++) {
        let str = data[i].parameters[k].name + ": " + data[i].parameters[k].value;
        params = params.concat(str);
      }

      services.get("/mainProduct/" + data[i].parentProduct, config)
        .then(response => {
          const parentProduct = response.data.data;
          this.setState((state) => {
            list = list.concat([
              {
                key: i,
                title: parentProduct.title,
                brand: parentProduct.brand,
                category: parentProduct.category,
                parameters: params.join(", "),
                price: data[i].vendorSpecifics[0].price,
                amountLeft: data[i].vendorSpecifics[0].amountLeft,
                cargoCompany: data[i].vendorSpecifics[0].cargoCompany,
                shipmentPrice: data[i].vendorSpecifics[0].shipmentPrice,
                id: data[i]._id,
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
    services.delete("/product/" + product.id, config)
      .then(response => {
        console.log(response);
        this.getAllProducts();
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
        title: "Price",
        dataIndex: "price",
        key: "price",
      },
      {
        title: "Amount Left",
        dataIndex: "amountLeft",
        key: "amountLeft",
      },
      {
        title: "Cargo Company",
        dataIndex: "cargoCompany",
        key: "cargoCompany",
      },
      {
        title: "Shipment Price",
        dataIndex: "shipmentPrice",
        key: "shipmentPrice",
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
                  "Are you sure to delete this product?",
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