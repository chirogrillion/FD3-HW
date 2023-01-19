import React from 'react';
import ReactDOM from 'react-dom';

import './App.css';

import Button from './components/Button';
import {withTooltip} from './components/withTooltip';

const tooltipContent = [
  <h4 key={1}>Заголовок</h4>,
  <p key={2}>Первый абзац</p>,
  <img key={3} src="https://iili.io/Hc21j0G.png"/>,
  <p key={4}>Второй абзац</p>,
];
const ButtonWithTooltip = withTooltip(tooltipContent, 1000)(Button);

const showAlert = (num) => {
  switch (num) {
    case 1:
      return alert('Вы нажали первую кнопку.');
    case 2:
      return alert('Вы нажали вторую кнопку.');
  };
};

ReactDOM.render(
  <React.Fragment>
    <ButtonWithTooltip code={1} cbPressed={showAlert}>Кнопка c подсказкой</ButtonWithTooltip>
    <Button code={2} cbPressed={showAlert}>Кнопка обыкновенная</Button>
  </React.Fragment>,
  document.getElementById('wrapper')
);