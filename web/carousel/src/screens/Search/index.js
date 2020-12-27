import React, { Component } from "react";
import { Layout, Menu, Spin, Checkbox, Slider, Divider } from "antd";
import { withRouter } from "react-router";
import qs from "qs";
import SearchProduct from "../../components/ProductList/SearchProduct";
import services from "../../apis/services";
import SubMenu from "antd/lib/menu/SubMenu";

const { Content, Sider } = Layout;

class Search extends Component {
  state = {
    filters: {},
    selectedFilters: [],
    productList: [],
    error: null,
  };

  componentDidMount() {
    const { query } = qs.parse(this.props.location.search, {
      ignoreQueryPrefix: true,
    });
    this.setState({ query });
    this.getSearchedProducts(query);
    this.getSearchFilters(query);
  }

  getSearchedProducts(query) {
    const payload = {
      query: query,
    };
    services
      .post("/product/search", payload)
      .then((response) => {
        const results = response.data.results;
        const data = response.data.data;
        this.setState({ productList: data });
      })
      .catch((err, response) => {
        console.log(err);
      });
  }

  getSearchFilters(query) {
    const payload = {
      query: query,
    };
    services
      .post("/product/searchFilters", payload)
      .then((response) => {
        if (response.data.data) {
          const data = response.data.data;
          this.setState({ filters: data });
        } else {
          this.setState({ error: "No product" });
        }
      })
      .catch((err, response) => {
        console.log(err);
      });
  }

  componentDidUpdate(prevProps, prevState) {
    const { query } = qs.parse(this.props.location.search, {
      ignoreQueryPrefix: true,
    });
    if (this.state.query !== query) {
      this.setState({ query });
      this.getSearchedProducts(query);
      this.getSearchFilters(query);
    }
  }
  renderMultiCheckbox = ({ name, values }) => {
    return (
      <div
        style={{
          marginTop: 10,
          marginBottom: 10,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ fontWeight: "bold", marginBottom: 5 }}>
          {name.toUpperCase()}
        </div>
        {values.map((value) => (
          <Checkbox style={{ margin: 1 }}>{value}</Checkbox>
        ))}
        <Divider />
      </div>
    );
  };

  renderSideBar() {
    const {
      parameters,
      minPrice,
      maxPrice,
      vendors,
      categories,
      brands,
    } = this.state.filters;

    return (
      <Sider
        style={{ backgroundColor: "white", padding: 15 }}
        className="site-layout-background"
        width={250}
      >
        {parameters
          ? parameters.map((item) => this.renderMultiCheckbox(item))
          : null}

        {Array.isArray(brands) && brands.length
          ? this.renderMultiCheckbox({ name: "brands", values: brands })
          : null}

        {Array.isArray(vendors) && vendors.length
          ? this.renderMultiCheckbox({
              name: "vendors",
              values: vendors.map((e) => e._id),
            })
          : null}
        {maxPrice && typeof minPrice === "number" ? (
          <div>
            <div>Price</div>
            <Slider max={maxPrice} min={minPrice} />
            <Divider></Divider>
          </div>
        ) : null}
        {Array.isArray(categories) && categories.length
          ? this.renderMultiCheckbox({
              name: "categories",
              values: categories,
            })
          : null}
      </Sider>
    );
  }

  renderContent() {
    return this.state.productList.length ? (
      <Content
        style={{
          padding: "0 24px",
          minHeight: "280px",
          width: "1000px",
          display: "grid",
          gridGap: "25px",
          gridTemplateColumns: "repeat(auto-fit, 350px)",
        }}
      >
        {this.state.productList.map((product) => {
          return (
            <span>
              <SearchProduct product={product} />;
            </span>
          );
        })}
      </Content>
    ) : (
      <Content
        style={{
          padding: "0 24px",
          minHeight: "280px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {this.state.error ? <div>No product</div> : <Spin size="large" />}
      </Content>
    );
  }

  render() {
    return (
      <div>
        <Layout>
          <Content style={{ padding: "0 50px", zIndex: 10 }}>
            <Layout
              className="site-layout-background"
              style={{ padding: "24px 0" }}
            >
              {this.renderSideBar()}
              {this.renderContent()}
            </Layout>
          </Content>
        </Layout>
      </div>
    );
  }
}

export default withRouter(Search);
