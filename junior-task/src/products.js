import React, { Component } from "react";
import withNavigateHook from "./hoc";
import axios from "axios";

export class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ids: [],
    };
    this.handleCheckbox = this.handleCheckbox.bind(this);
  }

  //creating axios.get request
  componentDidMount() {
    const url = "https://scandiweb-jun-task.000webhostapp.com/get.php";
    axios
      .get(url)
      .then((res) => {
        const dbData = res.data;
        this.setState({ dbData });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //making redirection on AddProductPage
  handleToAddProduct = () => {
    console.log("To add-page");
    this.props.navigation("/add-page");
  };

  //getting ids from checked elements
  handleCheckbox(event) {
    const target = event.target;
    let collectedIds = this.state.ids;
    let id = target.id;
    if (target.checked) {
      collectedIds.push(id);
    } else {
      let index = collectedIds.indexOf(id);
      collectedIds.splice(index, 1);
    }
    this.setState({ ids: collectedIds });
    //console.log(this.state.ids);
  }

  //creating axios delete request
  deleteItems = () => {
    const url = "https://scandiweb-jun-task.000webhostapp.com/delete.php";
    axios
      .post(url, { _method: "DELETE", data: { ids: this.state.ids } })
      .then(() => {
        const updatedDbData = this.state.dbData.filter(
          (item) => !this.state.ids.includes(item.id)
        );
        // console.log("dbData before delete:", this.state.dbData);
        // console.log("dbData after delete:", updatedDbData);
        this.setState({
          dbData: updatedDbData
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <>
        <header>
          <h1>Product List</h1>
          <div className="nav">
            <button onClick={this.handleToAddProduct}>ADD</button>
            <button onClick={() => this.deleteItems()} id="delete-product-btn">MASS DELETE</button>
          </div>
        </header>

        <div className="product-list">
          {this.state.dbData ? (
            this.state.dbData.map(
              ({
                id,
                sku,
                name,
                price,
                weight,
                size,
                length,
                height,
                width,
              }) => (
                <div className="product" key={id}>
                  <input
                    type="checkbox"
                    className="delete-checkbox"
                    id={id}
                    onChange={this.handleCheckbox}
                  />
                  <div className="product-info">
                    <span>{sku}</span>
                    <span>{name}</span>
                    <span>{`${price} $`}</span>
                    <span>
                      {weight && `Weight: ${weight} KG`}
                      {size && `Size: ${size} MB`}
                      {length &&
                        height &&
                        width &&
                        `Dimensions: 
                        ${height}x${width}x${length}`}
                    </span>
                  </div>
                </div>
              )
            )
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </>
    );
  }
}

export default withNavigateHook(Products);
