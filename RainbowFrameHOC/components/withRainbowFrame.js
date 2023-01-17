import React from 'react';

function withRainbowFrame(colorsArr) {
  return function(Component) {
    return props => (
      colorsArr.reduce((r, v) => (
        <div style={{
          width: 'fit-content',
          border: `solid 5px ${v}`,
          padding: '2px'
        }}>{r}</div>
      ), <Component {...props}/>)
    );
  };
}

export {withRainbowFrame};