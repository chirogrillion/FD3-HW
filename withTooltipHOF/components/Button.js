import React from 'react';

import './Button.css';

const Button = props => (
  <div className="Button">
    <input type="button" value={props.children} onClick={() => props.cbPressed(props.code)}/>
  </div>
);

export default Button;