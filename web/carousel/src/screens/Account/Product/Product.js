import React, { useEffect, useState, Component } from "react";
import services from "../../../apis/services";
import { Form, Input, InputNumber, Button, Space } from 'antd';
import { SearchOutlined } from "@ant-design/icons";
import Table from "antd/lib/table";

import classes from "./Product.module.css";
import 'antd/dist/antd.css';
import "../../../antd.css";

const TOKEN = localStorage.getItem("token");

class Product extends Component {
  constructor(props) {
    super(props);
    this.state =
      {
        mainProducts: null,
        baseMainProducts: null,
        firstTime: true,
      };
  }

  componentDidMount() {
    let config = "";
    this.getMainProduct();
  }

  onFinish = values => {
    console.log(values);
  };

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

  getMainProduct = () => {
    services.get("/mainProduct")
      .then((response) => {
        console.log(response.data.data);
        let temp = [];
        const tempObj = response.data.data;
        Object.keys(tempObj).map(( key) => {
          temp = temp.concat(response.data.data[key]);
        }, []);
        // setMainProducts([...temp]);
        this.showProducts(temp);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  showProducts = (data, filter) => {
    const temp = [...data];
    this.setState({mainProducts: []});
    this.setState((state) => {
      let list = [];
      let params = [];
      for (let i = 0; i < data.length; i++) {
        for (let k = 0; k < data[i].parameters.length; k++) {
          params = params.concat([data[i].parameters[k].name]);
        }
        console.log(params);
        list = list.concat([
          {
            key: i,
            title: data[i].title,
            brand: data[i].brand,
            category: data[i].category,
            parameters: params.join(", "),
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

  searchProductHandler = (e) => {
    const value = e.target.value;

    if (value !== "" && e.key === "Enter") {
      const filterTable = this.state.baseMainProducts.filter(o => o.title.toLowerCase().includes(value.toLowerCase()));
      this.setState({mainProducts: filterTable});
    }
  }

  createExistingProduct = (productId) => {
    console.log(productId);
    // let url = "/vendor/me/product/new/";
    // let payload = {
    //
    //   tags: ["Samsung", "red", "XL"],
    //   parameters: [ { "name": "size", "value": "XL"} , { "name": "color", "values":"red"}   ],
    //   vendorSpecifics: [{
    //   vendorID: "5fc690feacfcd158eff91386",
    //   price: 66,
    //   amountLeft: 222,
    //   shipmentPrice: 15,
    //   cargoCompany: "A great One too",
    // }],
    //   default: {
    //   vendorID: "5fc690feacfcd158eff91386",
    //     price: 66,
    //     amountLeft: 222,
    //     shipmentPrice: 15,
    //     cargoCompany: "A great One too"
    // },
    //   photos: ["url2221", "url2"],
    //   parentProduct: "5fe04ba7a98fa3df1e54506c"
    //
    // };
    //
    // services
    //   .post(url, null, { params: payload })
    //   .then((response) => {
    //     console.log(response);
    //   })
    //   .catch((error) => {
    //     console.log("ERROR: " + error);
    //   });
  }

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
        title: "Action",
        key: "action",
        render: (id, record) => (

          <Space size="large">

            <a
              className={classes.TableActionsSuspend}
              onClick={() => { this.createExistingProduct(record.id);}}
            >
              Place Product
            </a>
            <br />
          </Space>
        ),
      },
    ];

    const data = this.state.mainProducts ? [this.state.mainProducts][0] : null;

    return (
      <div>
        <button onClick={this.postMainProduct}>
          POST main product
        </button>
        <button onClick={this.getMainProduct}>
          GET main product
        </button>
        <p>Search for products</p>
        <span className={classes.InputSpan}>
          <input
            className={classes.SearchInput}
            placeholder="product name..."
            onKeyPress={(event) => this.searchProductHandler(event)}
          />
          <SearchOutlined className={classes.SearchIcon} />
        </span>
        <Table dataSource={data} columns={columns} />
        {/*<Form {...layout} className={classes.myReset} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>*/}
        {/*  <Form.Item name={['user', 'name']} label="Name" rules={[{ required: true }]}>*/}
        {/*    <Input />*/}
        {/*  </Form.Item>*/}
        {/*  <Form.Item name={['user', 'email']} label="Email" rules={[{ type: 'email' }]}>*/}
        {/*    <Input />*/}
        {/*  </Form.Item>*/}
        {/*  <Form.Item name={['user', 'age']} label="Age" rules={[{ type: 'number', min: 0, max: 99 }]}>*/}
        {/*    <InputNumber />*/}
        {/*  </Form.Item>*/}
        {/*  <Form.Item name={['user', 'website']} label="Website">*/}
        {/*    <Input />*/}
        {/*  </Form.Item>*/}
        {/*  <Form.Item name={['user', 'introduction']} label="Introduction">*/}
        {/*    <Input.TextArea />*/}
        {/*  </Form.Item>*/}
        {/*  <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>*/}
        {/*    <Button type="primary" htmlType="submit">*/}
        {/*      Submit*/}
        {/*    </Button>*/}
        {/*  </Form.Item>*/}
        {/*</Form>*/}
      </div>
    );
  }
}

export default Product;