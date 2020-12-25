import React, { useEffect, useState, Component } from "react";
import services from "../../../apis/services";
import { Form, Input, InputNumber, Button, Space } from 'antd';
import { SearchOutlined } from "@ant-design/icons";
import Table from "antd/lib/table";

import classes from "./AddProduct.module.css";
// import 'antd/dist/antd.css';
// import "../../../antd.css";
import ProductForm from "./ProductForm/ProductForm";
import MainProductTable from "./MainProductTable/MainProductTable";
import ExistingProductsTable from "./ExistingProductsTable/ExistingProductsTable";
import ExistingProductForm from "./ExistingProductForm/ExistingProductForm";
import ButtonSecondary from "../../UI/ButtonSecondary/ButtonSecondary";
import ButtonPrimary from "../../UI/ButtonPrimary/ButtonPrimary";

const TOKEN = localStorage.getItem("token");



class Product extends Component {
  constructor(props) {
    super(props);
    this.state =
      {
        vendorId: "",
        mainProducts: null,
        baseMainProducts: null,
        childProducts: null,
        firstTime: true,
        showTable: true,
        showProductForm: false,
        showProducts: false,
        showNoProduct: false,
        showExistingProductForm: false,
        productId: "",
        product: {
          title: "",
          brand: "",
          tags: "",
          category: "",
          parameters: [],
        },
        parentProductTitle: "",
        parentProductBrand: "",
        parentProductCategory: "",
        parentProductId: "",
        parentProductParameters: "",
        existingProductTags: "",

      };
  }

  componentDidMount() {
    this.getMainProducts();
    this.getVendorId();
  }

  getVendorId = () => {
    const config = {
      headers: { Authorization: `Bearer ${TOKEN}` },
    };
    services.get("/vendor/me", config)
      .then((response) => {
        console.log(response);
        this.setState({vendorId: response.data.data._id});
      })
      .catch(error => {
        console.log(error);
      });
  }


  postMainProduct = () => {
    let url = "/mainProduct/";
    let payload =
      {
        title: "Nice TV ",
        parameters: [ { "name": "size", "values": [ "XL","L", "M"]} , { "name": "color", "values": [ "blue","green", "yellow"]}   ],
        description: "Description",
        rating: 0,
        numberOfRating: 0,
        brand: "Samsung",
        soldAmount: 0,
        category: "electronics",
        isConfirmed: false,
        tags: ["Apple", "blue", "green", "yellow", "XL", "L", "M"]
      };

    services
      .post(url, payload)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log("ERROR: " + error);
      });
  }

  getMainProducts = () => {
    services.get("/mainProduct")
      .then((response) => {
        console.log(response.data.data);
        let temp = [];
        const tempObj = response.data.data;
        Object.keys(tempObj).map(( key) => {
          temp = temp.concat(response.data.data[key]);
        }, []);
        // setMainProducts([...temp]);
        this.showMainProducts(temp);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  getExistingProducts = (parentProduct) => {

    services.get("/product?parentProduct=" + parentProduct.id)
      .then((response) => {
        console.log(response.data.data);
        this.setState({
          parentProductTitle: parentProduct.title,
          parentProductBrand: parentProduct.brand,
          parentProductCategory: parentProduct.category,
          parentProductId: parentProduct.id,
          product:{
            title:parentProduct.title,
            brand:parentProduct.brand,
            category:parentProduct.category,

          },
        });
        let temp = response.data.data;
        const tempObj = response.data.data;
        this.showChildProducts(temp);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  showMainProducts = (data, filter) => {
    const temp = [...data];
    this.setState({mainProducts: []});
    this.setState((state) => {
      let list = [];
      let params = [];
      for (let i = 0; i < data.length; i++) {
        for (let k = 0; k < data[i].parameters.length; k++) {
          params = params.concat([data[i].parameters[k].name]);
        }
        list = list.concat([
          {
            key: i,
            title: data[i].title,
            brand: data[i].brand,
            category: data[i].category,
            parameters: params.join(","),
            tags: data[i].tags,
            id: data[i]._id,
          },
        ]);
        params = [];
      }
      if (this.state.firstTime) {
        this.setState({baseMainProducts: list, firstTime: false});
      }
      return {
        mainProducts: list,
      };
    });

  };

  showChildProducts = (data) => {
    this.setState({childProducts: []});
    let parameterNames = [];
    let parameterValues = [];
    console.log(data);
    if(data.length > 0) {
      this.setState((state) => {
        let list = [];
        let params = [];
        let tags = [];
        let parameterLength = 0;
        this.setState({

        });

        for (let i = 0;i < data[0].parameters.length; i++) {
          parameterNames = [...parameterNames, data[0].parameters[i].name];
        }

        for (let i = 0; i < data.length; i++) {
          for (let k = 0; k < data[i].parameters.length; k++) {
            parameterValues = [...parameterValues, data[i].parameters[k].value];
            parameterLength++;
            //
          }
          //params = params.concat([parameterValues]);
          params = [...params, parameterValues];
          parameterValues = [];
          tags = data[i].tags;
          list = list.concat([
            {
              id: data[i]._id,
              parameters: params,
              parameterNames: parameterNames,
              tags: tags,
            },
          ]);
          params = [];
        }
        return {
          childProducts: list,
          parentProductParameters: parameterNames,
        }
      });
      this.setState({
        showProducts: true,
        showTable: false,
      });
    } else {
      this.setState({
        showNoProduct: true,
        showTable: false,
      });
    }
    console.log(this.state.childProducts);
  }

  searchMainProductHandler = (e) => {
    const value = e.target.value;
    this.setState({
      showTable:true,
      showProducts: false,
      showProductForm: false,
      showNoProduct: false,
      showExistingProductForm: false,
    });

    if (value !== "" && e.key === "Enter") {
      const filterTable = this.state.baseMainProducts.filter(o => o.title.toLowerCase().includes(value.toLowerCase()));
      this.setState({mainProducts: filterTable});
    } else if (value === "" && e.key === "Enter") {
      this.setState({mainProducts: this.state.baseMainProducts});
    }
  }

  placeProductHandler = (product) => {
    this.setState({
      showTable: false,
      showProducts: false,
      showProductForm: false,
      showNoProduct: false,
      showExistingProductForm: true,
      existingProductParams: product,
      existingProductTags: product.tags,
    });
  }

  placeNewProductHandler = (product) => {
    console.log("here");
    this.setState({
      showTable: false,
      showProducts: false,
      showProductForm: true,
      showNoProduct: false,
      showExistingProductForm: false,
      existingProductParams: product,
    });
  }

  addVendorToProduct = (product) => {
    console.log(product.user);
    const data = product.user;
    const config = {
      headers: { Authorization: `Bearer ${TOKEN}` },
    };
    let payload = {
      vendorSpecifics: {
        vendorID: "fc690feacfcd158eff91386",
        price: data.price,
        amountLeft: data.amount,
        shipmentPrice: data.shipmentPrice,
        cargoCompany: data.cargoCompany,
      }
    };
    console.log(payload);
    services.post("/vendor/me/product/existing/" + data.id, payload, config)
      .then(response => {
        console.log(response);
        this.setState({
          showTable: true,
          showProducts: false,
          showProductForm: false,
          showNoProduct: false,
          showExistingProductForm: false,
        });
      })
      .catch(error => {
        console.log(error);
      })
  }

  createFromMainProduct = (values) => {
    const productInfo = values.user;
    let parameterNames = [];
    let parameterValues = [];
    let parameterLength = 0;
    console.log(values.user);
    const tags = productInfo.tags.split(", ");
    Object.keys(productInfo).map((key, igKey) => {
      if (key.substring(0, 10) === "parameter_") {
        parameterNames = [...parameterNames, key.substring(10)];
        parameterValues = [...parameterValues, productInfo[key]];
        parameterLength++;
      }
    });
    let parameters = [];
    for(let i = 0; i < parameterNames.length; i++) {
      parameters = parameters.concat(
        {
          name: parameterNames[i],
          value: parameterValues[i],
        }
      );
    }
    console.log(parameters );
    let payload = {
      tags: tags,
      parameters: parameters,
      vendorSpecifics: [{
        vendorID: this.state.vendorId,
        price: productInfo.price,
        amountLeft: productInfo.amount,
        shipmentPrice: productInfo.shipmentPrice,
        cargoCompany: productInfo.cargoCompany,
      }],
      parentProduct: this.state.parentProductId,
    }
    const url = "/vendor/me/product/new";
    const config = {
      headers: { Authorization: `Bearer ${TOKEN}` },
    };
    console.log(payload);
    services
      .post(url, payload, config)
      .then((response) => {
        console.log(response);
        this.setState({
          showTable: true,
          showProductForm: false,
          showExistingProductForm: false,
        });
        alert("Product request is sent!");
      })
      .catch((error) => {
        console.log("ERROR: " + error);
      });
  }

  render() {

    const data = this.state.mainProducts ? [this.state.mainProducts][0] : null;

    let parameterInputs = "";
    let params = [];
    parameterInputs = params.map((param, igKey) => {
      return(
        <Form.Item name={['user', "parameter_" + param]} label={param.charAt(0).toUpperCase() + param.slice(1)}>
          <Input />
        </Form.Item>
      );
    });

    return (
      <div>
        {/*<button onClick={this.postMainProduct}>*/}
        {/*  POST main product*/}
        {/*</button>*/}
        {/*<button onClick={this.getMainProducts}>*/}
        {/*  GET main product*/}
        {/*</button>*/}
        <p>Search for main products</p>
        <span className={classes.InputSpan}>
          <input
            className={classes.SearchInput}
            placeholder="Main product name..."
            onKeyPress={(event) => this.searchMainProductHandler(event)}
          />
          <SearchOutlined className={classes.SearchIcon} />
        </span>
        {this.state.showTable ?
          <MainProductTable clicked={this.getExistingProducts} data={data}/>
          : null}
        {this.state.showProducts ?
          <div>
            <p>Product Name: {this.state.parentProductTitle}</p>
            <p>Product Brand: {this.state.parentProductBrand}</p>
            <p>Product Category: {this.state.parentProductCategory}</p>
            <ExistingProductsTable data={this.state.childProducts} clicked={this.placeProductHandler} />
            <ButtonSecondary
              title="Create new product from this product"
              style={{width: "350px", border:"2px solid #FF9100"}}
              onClick={() => this.placeNewProductHandler()}
            />
          </div>
          : null}
        {this.state.showNoProduct ?
          <div>
            <h2>No products found!</h2>
            <ButtonPrimary
              title="Create new product from this product"
              style={{width: "350px"}}
              onClick={() => this.placeNewProductHandler()}
            />
          </div>
          : null
        }
        {this.state.showProductForm ?
          <ProductForm
            parentProduct={this.state.parentProductId}
            product={this.state.product}
            parameterInputs={this.state.parentProductParameters}
            clicked={this.createFromMainProduct}/>
          : null}
        {this.state.showExistingProductForm ?
          <ExistingProductForm
            product={this.state.product}
            parameterInputs={this.state.existingProductParams}
            clicked={this.addVendorToProduct}
            tags={this.state.existingProductTags}/>
          : null}
      </div>
    );
  }
}

export default Product;