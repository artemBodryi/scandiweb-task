import React, { Component } from "react";
import Products from "./products";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddProducts from "./add-page";


export default class App extends Component {

  state = {
    products: []
  }

  handleAddProduct = (newProduct) => {
    this.setState(prevState => ({
      products: [...prevState.products, newProduct]
    }));
  }

  render() {
    return (
      <div className="wrapper">
        <Router>
          <Routes>
            <Route path="/" element={<Products product={this.state.products}/>} />
            <Route path="/add-page" element={<AddProducts onAddProduct={this.handleAddProduct}/>} />
          </Routes>
        </Router>

        <footer>
          <p>Scandiweb Junior Task</p>
        </footer>
      </div>
    );
  }
}
