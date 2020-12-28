import React from "react";
import { List, Avatar } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import services from "../../../../apis/services";
import ButtonSecondary from "../../../UI/ButtonSecondary/ButtonSecondary";
import { Button } from "antd";
import { withRouter } from "react-router-dom";

var otherOptions = [];
class OtherSellersComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      otherOptions: null,
    };
  }

  async componentWillMount() {
    if (otherOptions.length == 0) {
      console.log(this.props.product.vendorSpecifics);
      var i = 0;
      for (i; i < this.props.product.vendorSpecifics.length; i++) {
        var newOption = {
          vendorId: this.props.product.vendorSpecifics[i].vendorID._id,
          companyName: this.props.product.vendorSpecifics[i].vendorID
            .companyName,
          amountLeft: this.props.product.vendorSpecifics[i].amountLeft,
          shipmentPrice: this.props.product.vendorSpecifics[i].shipmentPrice,
          price: this.props.product.vendorSpecifics[i].price,
          cargoCompany: this.props.product.vendorSpecifics[i].cargoCompany,
        };
        otherOptions.push(newOption);
      }
      // var getParentProductUrl =
      //   "/product?parentProduct=" + this.props.product.parentProduct;
      // await services.get(getParentProductUrl).then((response) => {
      //   var options = response.data.data;
      //   var i = 0;
      //   for (i; i < options.length; i++) {
      //     if (this.props.product._id != options[i]._id) {
      //       var k = 0;
      //       for (k; k < options[i].vendorSpecifics.length; k++) {
      //         if (
      //           options[i].vendorSpecifics[k].vendorID &&
      //           options[i].vendorSpecifics[k].vendorID.companyName
      //         ) {
      //           var newOption = {
      //             _id: options[i]._id,
      //             price: options[i].default.price,
      //             vendorName:
      //               options[i].vendorSpecifics[k].vendorID.companyName,
      //           };
      //           otherOptions.push(newOption);
      //         }
      //       }
      //     }
      //   }
      // });
    }
    console.log(otherOptions);
    this.setState({ otherOptions: otherOptions });
  }
  handleClick(item) {
    console.log(item);
    this.props.setProductInfo(item);
    // var url = "/product/" + item._id;
    // this.props.history.push(url);
    // window.location.reload();
  }

  render() {
    const { router, params, location, routes } = this.props;
    return (
      <div>
        {" "}
        <List
          itemLayout="horizontal"
          dataSource={otherOptions}
          renderItem={(item) => (
            <List.Item
              actions={[
                <Button type="primary" onClick={() => this.handleClick(item)}>
                  Go to Product
                </Button>,
              ]}
            >
              <br></br>
              <br></br>
              <List.Item.Meta
                avatar={<ShoppingCartOutlined style={{ fontSize: "40px" }} />}
                // title={<a href={item.link}>{item.vendorName}</a>}
                title={item.companyName}
                description={item.price + "$"}
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
export default withRouter(OtherSellersComponent);
