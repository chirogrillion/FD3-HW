import React from 'react';
import ReactDOM from 'react-dom';

import './App.css';

import Shop from './components/Shop';
import Sidebar from './components/Sidebar';

const shopNameStr = 'iShop';
const productsArr = require('./products.json');

ReactDOM.render(
  <React.Fragment>
    <Shop shopName={shopNameStr} products={productsArr}/>
    <Sidebar/>
  </React.Fragment>,
  document.getElementById('container'),
);