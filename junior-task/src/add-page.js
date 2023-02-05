import React, { Component } from "react";
import "./App.css";
import withNavigateHook from "./hoc";
import axios from "axios";
const FormData = require("form-data");

export class AddProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sku: "",
      name: "",
      price: "",
      width: "",
      size: "",
      length: "",
      weight: "",
      height: "",
      productType: "default",
      isFormValid: false,
      errorMessage: "",
      existingSkus: [],
      isDuplicateSku: false,
    };
    this.onWeightChange = this.onWeightChange.bind(this);
    this.onSizeChange = this.onSizeChange.bind(this);
    this.onLengthChange = this.onLengthChange.bind(this);
    this.onWidthChange = this.onWidthChange.bind(this);
    this.onHeightChange = this.onHeightChange.bind(this);
    this.onSkuChange = this.onSkuChange.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.onPriceChange = this.onPriceChange.bind(this);
    this.handlePostOnSubmit = this.handlePostOnSubmit.bind(this);
    this.handleToProductList = this.handleToProductList.bind(this);
  }

  //getting input values with validation
  onWeightChange = (event) => {
    if (isNaN(event.target.value)) {
      this.setState({
        errorMessage: "Please, provide the data of indicated type",
      });
    } else {
      this.setState({ weight: event.target.value });
      this.setState({ errorMessage: "" });
    }
  };
  onSizeChange = (event) => {
    if (isNaN(event.target.value)) {
      this.setState({
        errorMessage: "Please, provide the data of indicated type",
      });
    } else {
      this.setState({ size: event.target.value });
      this.setState({ errorMessage: "" });
    }
  };
  onLengthChange = (event) => {
    if (isNaN(event.target.value)) {
      this.setState({
        errorMessage: "Please, provide the data of indicated type",
      });
    } else {
      this.setState({ length: event.target.value });
      this.setState({ errorMessage: "" });
    }
  };
  onWidthChange = (event) => {
    if (isNaN(event.target.value)) {
      this.setState({
        errorMessage: "Please, provide the data of indicated type",
      });
    } else {
      this.setState({ width: event.target.value });
      this.setState({ errorMessage: "" });
    }
  };
  onHeightChange = (event) => {
    if (isNaN(event.target.value)) {
      this.setState({
        errorMessage: "Please, provide the data of indicated type",
      });
    } else {
      this.setState({ height: event.target.value });
      this.setState({ errorMessage: "" });
    }
  };
  onSkuChange = (event) => {
    this.setState(
      {
        sku: event.target.value,
        isDuplicateSku: this.state.existingSkus.includes(event.target.value),
      },
      () => {
        this.validateForm();
      }
    );
  };
  onNameChange = (event) => {
    if (!/^[a-zA-Z_ ]+$/.test(event.target.value)) {
      this.setState({
        errorMessage: "Please, provide the data of indicated type",
      });
    } else {
      this.setState({ name: event.target.value }, () => {
        this.validateForm();
      });
      this.setState({ errorMessage: "" });
    }
  };
  onPriceChange = (event) => {
    if (isNaN(event.target.value)) {
      this.setState({
        errorMessage: "Please, provide the data of indicated type",
      });
    } else {
      this.setState({ price: event.target.value }, () => {
        this.validateForm();
      });
      this.setState({ errorMessage: "" });
    }
  };
  validateForm = () => {
    this.setState({
      isFormValid: this.state.sku && this.state.name && this.state.price,
    });
  };

  //have made axios post for API
  handlePostOnSubmit = (event) => {
    event.preventDefault();
    // if (this.state.isDuplicateSku) {
    //   this.setState({ errorMessage: "SKU already exists!" })
    // } else {
      if (
        !this.state.sku ||
        !this.state.name ||
        !this.state.price ||
        (this.state.productType === "book" && !this.state.weight) ||
        (this.state.productType === "DVD" && !this.state.size) ||
        (this.state.productType === "furniture" &&
          (!this.state.height || !this.state.width || !this.state.length)) ||
        this.state.productType === "default"
      ) {
        this.setState({ errorMessage: "Please, submit required data" });
        return false;
      } else {
        this.setState({ errorMessage: "" });
      }
      const url = "http://localhost:8080/scandi-api/insert.php";

      axios
        .post(url, {
          sku: this.state.sku,
          name: this.state.name,
          price: this.state.price,
          size: this.state.size,
          weight: this.state.weight,
          length: this.state.length,
          width: this.state.width,
          height: this.state.height,
        })
        .then((res) => console.log(res.data))
        .catch((error) => console.log(error));

      this.handleToProductList();
    //}
  };

  //navigation to Product-List
  handleToProductList = () => {
    console.log("To product-list");
    this.props.navigation("/");
  };

  //setProductType
  setProductType = () => {
    let products = document.getElementById("productType");
    this.setState({ productType: products.value });
  };

  render() {
    return (
      <form>
        <header>
          <h1>Add Product</h1>
          <span className="error-message nav-error-message">
            {this.state.errorMessage}
          </span>
          <div className="nav">
            <button
              onClick={(event) => this.handlePostOnSubmit(event)}
              disabled={!this.state.isFormValid}
            >
              Save
            </button>
            <button onClick={this.handleToProductList}>Cancel</button>
          </div>
        </header>
        <div className="product-list form" id="product_form">
          <div className="sku" method="post">
            <span>SKU</span>
            <input
              onChange={this.onSkuChange}
              value={this.state.sku}
              type="text"
              placeholder="sku"
              id="sku"
              name="products_sku"
              required
            />
            {this.state.isDuplicateSku && <span className="error-message">SKU already exists!</span>}
          </div>
          <div className="name">
            <span>Name</span>
            <input
              onChange={this.onNameChange}
              value={this.state.name}
              type="text"
              placeholder="name"
              id="name"
              name="products_name"
              required
            />
          </div>
          <div className="price">
            <span>Price</span>
            <input
              onChange={this.onPriceChange}
              value={this.state.price}
              type="text"
              placeholder="price"
              id="price"
              name="products_price"
              required
            />
          </div>

          <div className="dropdown">
            <span>Type :</span>
            <select
              id="productType"
              name="productType"
              type="button"
              onChange={this.setProductType}
              required
            >
              <option value="default">Type Switcher</option>
              <option value="DVD">DVD</option>
              <option value="book">Book</option>
              <option value="furniture">Furniture</option>
            </select>

            <>
              {this.state.productType === "default" ? (
                <></>
              ) : this.state.productType === "book" ? (
                <>
                  <div key={"1"}>
                    <div className="dropdown-form">
                      <span>Weight(KG):</span>
                      <input
                        type="text"
                        value={this.state.weight}
                        onChange={this.onWeightChange}
                        placeholder="Weight in KG"
                        name="products_weight"
                        required
                      />
                      {!this.state.weight && (
                        <span className="error-message">
                          Please, submit weight
                        </span>
                      )}
                      <span>*Please, provide weight</span>
                    </div>
                  </div>
                </>
              ) : this.state.productType === "DVD" ? (
                <>
                  <div key={"2"}>
                    <div className="dropdown-form">
                      <span>Size(MB):</span>
                      <input
                        type="text"
                        value={this.state.size}
                        onChange={this.onSizeChange}
                        placeholder="Size in MB"
                        name="products_size"
                        required
                      />
                      {!this.state.size && (
                        <span className="error-message">
                          Please, submit size
                        </span>
                      )}
                      <span>*Please, provide size</span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="column" key={"2"}>
                    <div className="dropdown-form">
                      <span>Height(CM):</span>
                      <input
                        type="text"
                        value={this.state.height}
                        onChange={this.onHeightChange}
                        placeholder="Height in CM"
                        name="products_height"
                        required
                      />
                      <span>Width(CM):</span>
                      <input
                        type="text"
                        value={this.state.width}
                        onChange={this.onWidthChange}
                        placeholder="Width in CM"
                        name="products_width"
                        required
                      />
                      <span>Length(CM):</span>
                      <input
                        type="text"
                        value={this.state.length}
                        onChange={this.onLengthChange}
                        placeholder="Length in CM"
                        name="products_length"
                        required
                      />
                      {!this.state.length &&
                        !this.state.width &&
                        !this.state.height && (
                          <span className="error-message">
                            Please, submit dimensions
                          </span>
                        )}
                      <span>*Please, provide dimensions</span>
                    </div>
                  </div>
                </>
              )}
            </>
          </div>
        </div>
      </form>
    );
  }
}

export default withNavigateHook(AddProducts);
