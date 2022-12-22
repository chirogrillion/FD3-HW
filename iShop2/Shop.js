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
      selectedProduct: null,
    };
  },

  productSelected: function(c) {
    if (this.state.selectedProduct === c) {
      this.setState({selectedProduct: null});
    }
    else {
      this.setState({selectedProduct: c});
    }
  },

  deleteProduct: function(c) {

    const newList = this.state.products.filter(function(v) {
      if (v.code !== c) return true;
      else return false;
    });

    if (this.state.selectedProduct === c) {
      this.setState({products: newList, selectedProduct: null});
    }
    else {
      this.setState({products: newList});
    }

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
        cbProductSelected: this.productSelected,
        isSelected: this.state.selectedProduct === v.code,
        cbDeleteProduct: this.deleteProduct,
      })
    );

    return React.DOM.section({className: 'Shop'},
      React.DOM.h1(null, this.props.shopName),
      React.DOM.div(null, productsCode),
    );

  },

});