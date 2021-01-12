import React, { Component } from "react";
import { Space } from "antd";
import Table from "antd/lib/table";
import classes from "./ProductRequests.module.css";
import services from "../../../apis/services";
import { SearchOutlined } from "@ant-design/icons";

const TOKEN = localStorage.getItem("token");

const config = {
  headers: { Authorization: `Bearer ${TOKEN}` },
};

class ProductRequests extends Component {
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
      loading: false,
      loadingCount: 0,
    };
  }

  componentDidMount() {
    this.getProductRequests();
  }

  getProductRequests = async () => {
    this.setState({ loading: true });
    services
      .get("/productRequest/", config)
      .then((response) => {
        this.showProductRequests(response.data.data);
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

  showProductRequests = (data) => {
    this.setState({ productRequests: [] });

    let title = "";
    let brand = "";
    let category = "";
    let list = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].status === "PENDING") {
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
                  loading: false,
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
          const newValue = data[i].newValue;
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
                        price: newValue.vendorSpecifics.price,
                        amountLeft: newValue.vendorSpecifics.amountLeft,
                        cargoCompany: newValue.vendorSpecifics.cargoCompany,
                        shipmentPrice: newValue.vendorSpecifics.shipmentPrice,
                        status: data[i].status,
                        productID: normalProduct._id,
                        id: data[i]._id,
                      },
                    ]);
                    return {
                      productRequests: list,
                      baseProductRequests: list,
                      loading: false,
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
      } else {
        this.setState({ loading: false });
      }
    }
  };

  declineProductRequestHandler = (product) => {
    const status = "DECLINED";
    const payload = {
      status: status,
    };
    this.productRequestHandler(product, payload);
  };

  confirmProductRequestHandler = (product) => {
    const status = "ACCEPTED";
    const payload = {
      status: status,
    };
    this.productRequestHandler(product, payload);
  };

  productRequestHandler = (product, payload) => {
    services
      .patch("/productRequest/" + product.id, payload, config)
      .then((response) => {
        if (payload.status === "ACCEPTED") {
          if (product.type === "Existing Product") {
            this.publishVendorToExistingProduct(product, response.data.data);
          } else if (product.type === "New Product") {
            this.publishProduct(product, response.data.data);
          }
        } else {
          alert("Product request declined!");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  publishProduct = (product, vendorData) => {
    let payload = {
      parameters: vendorData.newValue.parameters,
      vendorSpecifics: [
        {
          price: product.price,
          amountLeft: product.amountLeft,
          shipmentPrice: product.shipmentPrice,
          cargoCompany: product.cargoCompany,
          vendorID: vendorData.vendorID,
        },
      ],
      tags: vendorData.newValue.tags,
      parentProduct: vendorData.newValue.parentProduct,
      photos: vendorData.newValue.photos,
    };

    services
      .post("/product", payload, config)
      .then((response) => {
        alert("New product added!!");
        this.getProductRequests();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  publishVendorToExistingProduct = (product, vendorData) => {
    let payload = {
      vendorID: vendorData.newValue.vendorSpecifics.vendorID,
      price: vendorData.newValue.vendorSpecifics.price,
      amountLeft: vendorData.newValue.vendorSpecifics.amountLeft,
      shipmentPrice: vendorData.newValue.vendorSpecifics.shipmentPrice,
      cargoCompany: vendorData.newValue.vendorSpecifics.cargoCompany,
    };
    services
      .post("/product/" + product.productID, payload, config)
      .then((response) => {
        alert("Vendor added to product!!");
        this.getProductRequests();
      })
      .catch((error) => {
        console.log(error);
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
                this.confirmProductRequestHandler(record);
              }}
            >
              Confirm
            </a>
            <a
              className={classes.TableActionsSuspend}
              onClick={() => {
                this.declineProductRequestHandler(record);
              }}
            >
              Decline
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
            loading={this.state.loading}
            scroll={{ x: true }}
            columns={columns}
          />
        ) : null}
      </div>
    );
  }
}

export default ProductRequests;
