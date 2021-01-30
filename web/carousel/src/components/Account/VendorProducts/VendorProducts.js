import React, { Component } from "react";
import { message, Space } from "antd";
import Table from "antd/lib/table";
import services from "../../../apis/services";
import classes from "../VendorAddProduct/AddProduct.module.css";
import VendorEditProductForm from "./VendorEditProductForm";
import confirmPopup from "../../UI/ConfirmPopup/ConfirmPopup";
import { SearchOutlined } from "@ant-design/icons";

const TOKEN = localStorage.getItem("token");

class VendorProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      data: null,
      products: [],
      baseProducts: [],
      gotProducts: false,
      showProducts: true,
      showEditProductForm: false,
      showDeletePopup: false,
      product: null,
      loadingProducts: false,
    };
  }

  componentDidMount() {
    const TOKEN = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${TOKEN}` },
    };
    this.getMyInfo(config);
    this.setState({ loadingProducts: true });
    this.getAllMyProducts(config);
  }

  getMyInfo = (config) => {
    const TOKEN = localStorage.getItem("token");
    services
      .get("/vendor/me", config)
      .then((response) => {
        this.setState({
          id: response.data.data._id,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  searchProductsHandler = (e) => {
    const value = e.target.value;
    this.setState({
      showProducts: true,
      showEditProductForm: false,
      showDeletePopup: false,
    });

    if (value !== "" && e.key === "Enter") {
      const filterTable = this.state.baseProducts.filter((o) =>
        o.title.toLowerCase().includes(value.toLowerCase())
      );
      this.setState({ products: filterTable });
    } else if (value === "" && e.key === "Enter") {
      this.setState({ products: this.state.baseProducts });
    }
  };

  getAllMyProducts = (config) => {
    services
      .get("/vendor/me/product", config)
      .then((response) => {
        this.showAllMyProducts(response.data.data, config);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  showAllMyProducts = (data, config) => {
    let list = [];

    if (data.length === 0) this.setState({ loadingProducts: false });
    for (let i = 0; i < data.length; i++) {
      let params = [];
      for (let k = 0; k < data[i].parameters.length; k++) {
        let str =
          data[i].parameters[k].name + ": " + data[i].parameters[k].value;
        params = params.concat(str);
      }

      services
        .get("/mainProduct/" + data[i].parentProduct, config)
        .then((response) => {
          const parentProduct = response.data.data;
          this.setState((state) => {
            list = list.concat([
              {
                key: i,
                title: parentProduct.title,
                brand: parentProduct.brand,
                category: parentProduct.category,
                parameters: params.join(", "),
                price: data[i].vendorSpecifics.price,
                amountLeft: data[i].vendorSpecifics.amountLeft,
                cargoCompany: data[i].vendorSpecifics.cargoCompany,
                shipmentPrice: data[i].vendorSpecifics.shipmentPrice,
                id: data[i]._id,
              },
            ]);
            return {
              baseProducts: list,
              products: list,
              loadingProducts: false,
            };
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  editProductHandler = (product) => {
    this.setState({
      showProducts: false,
      showEditProductForm: true,
      showDeletePopup: false,
      product: product,
    });
  };

  editProductRequest = (data) => {
    const product = data.user;
    const TOKEN = localStorage.getItem("token");

    const config = {
      headers: { Authorization: `Bearer ${TOKEN}` },
    };
    let payload = {
      vendorSpecifics: {
        vendorID: this.state.id,
        price: product.price,
        amountLeft: product.amountLeft,
        shipmentPrice: product.shipmentPrice,
        cargoCompany: product.cargoCompany,
      },
    };
    services
      .patch("/vendor/me/product/" + this.state.product.id, payload, config)
      .then((response) => {
        message.success("Edit request is sent!");
        this.setState({
          showProducts: true,
          showEditProductForm: false,
          showDeletePopup: false,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  deleteProductHandler = (product) => {
    const id = product.id;
    const TOKEN = localStorage.getItem("token");

    const config = {
      headers: { Authorization: `Bearer ${TOKEN}` },
    };

    services
      .delete("/vendor/me/product/" + id, config)
      .then((response) => {
        message.success("Delete request sent!\nAfter we confirm the operation, the product will be deleted.");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const columns = [
      {
        title: "Product Name",
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
        title: "Action",
        key: "action",
        render: (id, record) => (
          <Space size="large">
            <a
              className={classes.TableActionsSuspend}
              onClick={() => {
                this.editProductHandler(record);
              }}
            >
              Edit
            </a>
            <a
              className={classes.TableActionsSuspend}
              onClick={() => {
                confirmPopup(
                  "Are you sure you want to delete this product?",
                  () => this.deleteProductHandler(record)
                );
              }}
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
            onKeyPress={(event) => this.searchProductsHandler(event)}
          />
          <SearchOutlined className={classes.SearchIcon} />
        </span>
        {this.state.showProducts ? (
          <Table
            dataSource={data}
            loading={this.state.loadingProducts}
            columns={columns}
          />
        ) : null}
        {this.state.showEditProductForm ? (
          <VendorEditProductForm
            product={this.state.product}
            clicked={this.editProductRequest}
          />
        ) : null}
      </div>
    );
  }
}

export default VendorProducts;
