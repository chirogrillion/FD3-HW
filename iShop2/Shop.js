let Shop = React.createClass({

  displayName: 'Shop',

  propTypes: {
    shopName: React.PropTypes.string.isRequired,
    products: React.PropTypes.arrayOf(React.PropTypes.shape({
      code: React.PropTypes.number.isRequired,
      name: React.PropTypes.string.isRequired,
      category: React.PropTypes.string.isRequired,
      photo: React.PropTypes.string.isRequired,
      description: React.PropTypes.string,
      inStock: React.PropTypes.number.isRequired,
      price: React.PropTypes.number.isRequired,
    })),
  },

  getInitialState: function() {
    return {
      products: this.props.products,
    };
  },

  render: function() {

    const productsCode = this.state.products.map(v =>
      React.createElement(Product, {
        key: v.code,
        code: v.code,
        name: v.name,
        category: v.category,
        photo: v.photo,
        description: v.description,
        inStock: v.inStock,
        price: v.price,
      })
    );

    return React.DOM.section({className: 'Shop'},
      React.DOM.h1(null, this.props.shopName),
      React.DOM.div(null, productsCode),
    );

  },

});