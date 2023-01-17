import React from 'react';
import ReactDOM from 'react-dom';

import './App.css';

import DoubleButton from './components/DoubleButton';
import {withRainbowFrame} from './components/withRainbowFrame';

import colors from './colors.json';
const FramedDoubleButton = withRainbowFrame(colors)(DoubleButton);

const showAlert = (num) => alert(num);

ReactDOM.render(
  <React.Fragment>
    <DoubleButton
      caption1="однажды"
      caption2="пору"
      cbPressed={showAlert}
    >в студёную зимнюю</DoubleButton>
    <FramedDoubleButton
      caption1="я из лесу"
      caption2="мороз"
      cbPressed={showAlert}
    >вышел, был сильный</FramedDoubleButton>
  </React.Fragment>,
  document.getElementById('wrapper')
);