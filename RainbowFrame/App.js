import React from 'react';
import ReactDOM from 'react-dom';

import RainbowFrame from './components/RainbowFrame';

import colorsArr from './colors.json';

ReactDOM.render(
  <RainbowFrame colors={colorsArr}>Hello!</RainbowFrame>,
  document.getElementById('wrapper')
);