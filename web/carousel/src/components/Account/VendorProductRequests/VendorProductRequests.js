import React, { Component } from "react";
import { Space } from "antd";
import Table from "antd/lib/table";
import classes from "../VendorAddProduct/AddProduct.module.css";
import services from "../../../apis/services";
import confirmPopup from "../../UI/ConfirmPopup/ConfirmPopup";
import VendorEditProductRequestForm from "./VendorEditProductRequestForm";
import VendorEditProductForm from "../VendorProducts/VendorEditProductForm";
import { SearchOutlined } from "@ant-design/icons";

const TOKEN = localStorage.getItem("token");

class VendorProductRequests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      productRequests: [],
      baseProductRequests: [],
      gotProducts: false,
      showRequests: true,
      showRequestForm: false,
      request: null,
      loadingRequests: false,
    };
  }

  componentDidMount() {
    this.setState({ loadingRequests: true });
    this.getProductRequests();
  }

  getProductRequests = async () => {
    const config = {
      headers: { Authorization: `Bearer ${TOKEN}` },
    };
    services
      .get("/vendor/me/productRequest/", config)
      .then((response) => {
        this.showProductRequests(response.data.data, config);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  searchProductRequestsHandler = (e) => {
    const value = e.target.value;
    this.setState({
      showRequests: true,
      showRequestForm: false,
      showDeletePopup: false,
    });

    if (value !== "" && e.key === "Enter") {
      const filterTable = this.state.baseProductRequests.filter((o) =>
        o.title.toLowerCase().includes(value.toLowerCase())
      );
      this.setState({ productRequests: filterTable });
    } else if (value === "" && e.key === "Enter") {
      this.setState({ productRequests: this.state.baseProductRequests });
    }
  };

  showProductRequests = (data, config) => {
    this.setState({ productRequests: [] });

    let title = "";
    let brand = "";
    let category = "";
    let list = [];
    if (data.length === 0) this.setState({ loadingRequests: false });
    for (let i = 0; i < data.length; i++) {
      let params = [];
      let productData = data[i].newValue;

      if (data[i].type === "ADD_NEW_PRODUCT") {
        for (let k = 0; k < productData.parameters.length; k++) {
          let str =
            productData.parameters[k].name +
            ": " +
            productData.parameters[k].value;
          params = params.concat(str);
        }
        const type = "New Product";
        services
          .get("/mainProduct/" + productData.parentProduct, config)
          .then((response) => {
            title = response.data.data.title;
            brand = response.data.data.brand;
            category = response.data.data.category;
            this.setState((state) => {
              list = list.concat([
                {
                  key: i,
                  title: title,
                  brand: brand,
                  category: category,
                  parameters: params.join(", "),
                  type: type,
                  price: productData.vendorSpecifics[0].price,
                  amountLeft: productData.vendorSpecifics[0].amountLeft,
                  cargoCompany: productData.vendorSpecifics[0].cargoCompany,
                  shipmentPrice: productData.vendorSpecifics[0].shipmentPrice,
                  status: data[i].status,
                  id: data[i]._id,
                },
              ]);
              return {
                productRequests: list,
                baseProductRequests: list,
                loadingRequests: false,
              };
            });
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        let type = "";
        if (data[i].type === "ADD_EXISTING_PRODUCT") {
          type = "Existing Product";
        } else if (data[i].type === "UPDATE_PRODUCT") {
          type = "Update Product";
        }
        services
          .get("/product/" + data[i].oldValue, config)
          .then((response) => {
            const normalProduct = response.data.data;

            for (let k = 0; k < normalProduct.parameters.length; k++) {
              let str =
                normalProduct.parameters[k].name +
                ": " +
                normalProduct.parameters[k].value;
              params = params.concat(str);
            }
            services
              .get("/mainProduct/" + normalProduct.parentProduct, config)
              .then((response) => {
                title = response.data.data.title;
                brand = response.data.data.brand;
                category = response.data.data.category;
                this.setState((state) => {
                  list = list.concat([
                    {
                      key: i,
                      title: title,
                      brand: brand,
                      category: category,
                      parameters: params.join(", "),
                      type: type,
                      price: normalProduct.vendorSpecifics[0].price,
                      amountLeft: normalProduct.vendorSpecifics[0].amountLeft,
                      cargoCompany:
                        normalProduct.vendorSpecifics[0].cargoCompany,
                      shipmentPrice:
                        normalProduct.vendorSpecifics[0].shipmentPrice,
                      status: data[i].status,
                      id: data[i]._id,
                    },
                  ]);
                  return {
                    productRequests: list,
                    baseProductRequests: list,
                  };
                });
              })
              .catch((error) => {
                console.log(error);
              });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  };

  deleteProductRequestHandler = (product) => {
    const config = {
      headers: { Authorization: `Bearer ${TOKEN}` },
    };
    services
      .delete("/vendor/me/productRequest/" + product.id, config)
      .then((response) => {
        this.getProductRequests().then((r) => console.log(r));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  editProductRequestHandler = (product) => {
    this.setState({
      showRequests: false,
      showRequestForm: true,
      request: product,
    });
  };

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
        title: "Type",
        dataIndex: "type",
        key: "type",
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
                this.editProductRequestHandler(record);
              }}
            >
              Edit
            </a>
            <a
              className={classes.TableActionsSuspend}
              onClick={() => {
                confirmPopup(
                  "Are you sure you want to delete this product request?",
                  this.deleteProductRequestHandler(record)
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

    let data = this.state.productRequests;
    return (
      <div>
        <span className={classes.InputSpan}>
          <input
            className={classes.SearchInput}
            placeholder="Product request title..."
            onKeyPress={(event) => this.searchProductRequestsHandler(event)}
          />
          <SearchOutlined className={classes.SearchIcon} />
        </span>
        {this.state.showRequests ? (
          <Table
            dataSource={data}
            loading={this.state.loadingRequests}
            columns={columns}
          />
        ) : null}
        {this.state.showRequestForm ? (
          <VendorEditProductRequestForm
            request={this.state.request}
            clicked={this.editProductRequest}
          />
        ) : null}
      </div>
    );
  }
}

export default VendorProductRequests;
