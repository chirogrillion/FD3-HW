import React from 'react';
import ReactDOM from 'react-dom';

import Shop from './components/Shop';

const shopNameStr = 'iShop';
const productsArr = require('./products.json');

ReactDOM.render(
  React.createElement(Shop, {shopName: shopNameStr, products: productsArr}),
  document.getElementById('wrapper'),
);