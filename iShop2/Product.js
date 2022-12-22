let Product = React.createClass({

  displayName: 'Product',

  propTypes: {
    code: React.PropTypes.number.isRequired,
    name: React.PropTypes.string.isRequired,
    category: React.PropTypes.string.isRequired,
    photo: React.PropTypes.string.isRequired,
    description: React.PropTypes.string,
    inStock: React.PropTypes.number.isRequired,
    price: React.PropTypes.number.isRequired,
  },

  getInitialState: function() {
    return {

    };
  },

  formatPrice: function(num) {
    return new Intl.NumberFormat('ru-BY', {style: 'currency', currency: 'BYN'}).format(num);
  },

  render: function() {

    const descr = this.props.description;

    return React.DOM.article({className: 'Product', onClick: this.selectProduct},
      React.DOM.img({src: this.props.photo}),
      React.DOM.div({className: 'Product-name'},
        React.DOM.h2(null, this.props.name),
        descr ? React.DOM.p(null, descr) : null,
      ),
      React.DOM.p({className: 'Product-category'}, this.props.category),
      React.DOM.p({className: 'Product-price'}, this.formatPrice(this.props.price)),
      React.DOM.p({className: 'Product-in_stock'},
        React.DOM.span(null, this.props.inStock),
      ),
      React.DOM.button({onClick: this.deleteProduct}, 'Удалить'),
    );

  },

});