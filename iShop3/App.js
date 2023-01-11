import React from 'react';
import ReactDOM from 'react-dom';

import './App.css';

import Shop from './components/Shop';

const shopNameStr = 'iShop';
const productsArr = require('./products.json');

ReactDOM.render(
  <Shop shopName={shopNameStr} products={productsArr}/>,
  document.getElementById('container')
);