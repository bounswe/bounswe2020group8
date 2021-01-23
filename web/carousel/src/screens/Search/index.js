import React, { Component } from "react";
import { Layout, Menu, Spin, Checkbox, Slider, Divider } from "antd";
import { withRouter } from "react-router";
import qs from "qs";
import SearchProduct from "../../components/ProductList/SearchProduct";
import services from "../../apis/services";
import SubMenu from "antd/lib/menu/SubMenu";
import { Select } from "antd";

const { Option } = Select;

const { Content, Sider } = Layout;

class Search extends Component {
  state = {
    filters: {},
    selectedFilters: [],
    productList: [],
    error: null,
    priceInterval: [],
    sort: null,
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
    const objectMap = (obj, fn) =>
      Object.fromEntries(
        Object.entries(obj).map(([k, v], i) => [k, fn(v, k, i)])
      );

    let params = objectMap(this.state.selectedFilters, (values) =>
      values.join()
    );

    Object.keys(params).forEach(
      (key) => (params[key] == null || params[key] === "") && delete params[key]
    );

    params["minPrice[gte]"] = this.state.priceInterval[0];
    params["minPrice[lte]"] = this.state.priceInterval[1];
    params["sort"] = this.state.sort;

    const TOKEN = localStorage.getItem("token");
    let config = { params: params };

    if (TOKEN) {
      config = { ...config, headers: { Authorization: `Bearer ${TOKEN}` } };
    }

    console.log(config, payload);

    services
      .post("/product/search", payload, config)
      .then((response) => {
        const results = response.data.results;
        const data = response.data.data;
        this.setState({ productList: data });
      })
      .catch((err, response) => {
        console.log(err);
      });
  }

  onSortChange(e) {
    if (e === "default") {
      this.setState({ sort: null });
    } else if (e === "ascendingPrice") {
      this.setState({ sort: "minPrice" });
    } else if (e === "decreasingPrice") {
      this.setState({ sort: "-minPrice" });
    }
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
          this.setState({ priceInterval: [data.minPrice, data.maxPrice] });
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

    if (this.state.selectedFilters !== prevState.selectedFilters) {
      this.getSearchedProducts(this.state.query);
    }

    if (this.state.priceInterval !== prevState.priceInterval) {
      this.getSearchedProducts(this.state.query);
    }
    if (this.state.sort !== prevState.sort) {
      this.getSearchedProducts(this.state.query);
    }
  }

  onPriceIntervalChange(e) {
    this.setState({ priceInterval: e });
  }

  onCheckboxChange(e) {
    const [filterType, value] = e.target.value.split(":");
    if (e.target.checked) {
      if (this.state.selectedFilters[filterType]) {
        this.setState({
          selectedFilters: {
            ...this.state.selectedFilters,
            [filterType]: [...this.state.selectedFilters[filterType], value],
          },
        });
      } else {
        this.setState({
          selectedFilters: {
            ...this.state.selectedFilters,
            [filterType]: [value],
          },
        });
      }
    } else {
      this.setState({
        selectedFilters: {
          ...this.state.selectedFilters,
          [filterType]: this.state.selectedFilters[filterType].filter(
            (v) => v !== value
          ),
        },
      });
    }
  }

  renderMultiCheckbox = ({ name, values, ids }) => {
    if (!ids) {
      ids = [...values];
    }
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
        {values.map((value, index) => (
          <Checkbox
            value={name + ":" + ids[index]}
            onChange={(e) => this.onCheckboxChange(e)}
            style={{ margin: 1 }}
          >
            {value}
          </Checkbox>
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
          ? this.renderMultiCheckbox({ name: "brand", values: brands })
          : null}

        {Array.isArray(vendors) && vendors.length
          ? this.renderMultiCheckbox({
              name: "vendors",
              values: vendors.map((e) => e.companyName),
              ids: vendors.map((e) => e._id),
            })
          : null}
        {maxPrice && typeof minPrice === "number" ? (
          <div>
            <div>Price</div>
            <Slider
              max={maxPrice}
              min={minPrice}
              range={true}
              defaultValue={[minPrice, maxPrice]}
              onAfterChange={(e) => this.onPriceIntervalChange(e)}
            />
            <Divider></Divider>
          </div>
        ) : null}
        {Array.isArray(categories) && categories.length
          ? this.renderMultiCheckbox({
              name: "category",
              values: categories,
            })
          : null}
      </Sider>
    );
  }

  renderContent() {
    return this.state.productList.length ? (
      <div>
        <div
          style={{
            margin: "0px 0px 35px 35px",
            height: "50px",
            backgroundColor: "white",
            width: "1100px",
            display: "flex",
            paddingLeft: "15px",
            paddingRight: "15px",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: "15px",
            borderRadius: "5px",
          }}
        >
          <div>
            We've found {this.state.productList.length} result
            {this.state.productList.length > 0 ? "s" : ""} related to "
            {this.state.query}"
          </div>
          <div>
            Sort According To:{" "}
            <Select
              defaultValue="default"
              style={{ width: 150 }}
              onChange={(e) => {
                this.onSortChange(e);
              }}
            >
              <Option value="default">Featured</Option>
              <Option value="ascendingPrice">Price: Low to High</Option>
              <Option value="decreasingPrice">Price: High to Low</Option>
            </Select>
          </div>
        </div>
        <Content
          style={{
            padding: "0 24px",
            minHeight: "280px",
            width: "1200px",
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
      </div>
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
