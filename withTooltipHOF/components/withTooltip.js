import React from 'react';

import './withTooltip.css';

function withTooltip(jsx,ms) {
  return function(Component) {
    return class extends React.Component {

      state = {
        shown: false,
      };

      timer = null;

      showTooltip = () => {
        this.timer = setTimeout(() => this.setState({shown: true}), ms);
      };

      hideTooltip = () => {
        clearTimeout(this.timer);
        this.setState({shown: false});
      };

      render() {
        return (
          <div
            className="withTooltip"
            onPointerEnter={this.showTooltip}
            onPointerLeave={this.hideTooltip}
          >
            <Component {...this.props}/>
            {this.state.shown ? <article onClick={this.hideTooltip}>{jsx}</article> : null}
          </div>
        );
      };

    };
  };
}

export {withTooltip};