import React, { Component } from "react";
import Products from "./products";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddProducts from "./add-page";
import axios from "axios";


export default class App extends Component {

  render() {
    return (
      <div className="wrapper">
        <Router>
          <Routes>
            <Route path="/" element={<Products />} />
            <Route path="/add-page" element={<AddProducts />} />
          </Routes>
        </Router>

        <footer>
          <p>Scandiweb Junior Task</p>
        </footer>
      </div>
    );
  }
}
