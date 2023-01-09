import React from 'react';
import PropTypes from 'prop-types';

import './Shop.css';

import Product from './Product'

class Shop extends React.Component {

  static propTypes = {
    shopName: PropTypes.string.isRequired,
    products: PropTypes.arrayOf(PropTypes.shape({
      code: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      tn: PropTypes.string.isRequired,
      description: PropTypes.string,
      inStock: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
    })),
  };

  state = {
    products: this.props.products,
    selectedProduct: null,
  };

  productSelected = (c) => {
    if (this.state.selectedProduct === c) {
      this.setState({selectedProduct: null});
    }
    else {
      this.setState({selectedProduct: c});
    }
  };

  deleteProduct = (c) => {

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

  };

  render() {

    const productsCode = this.state.products.map(v =>
      <Product
        key={v.code}
        code={v.code}
        name={v.name}
        category={v.category}
        tn={v.tn}
        description={v.description}
        inStock={v.inStock}
        price={v.price}
        cbProductSelected={this.productSelected}
        isSelected={this.state.selectedProduct === v.code}
        cbDeleteProduct={this.deleteProduct}
      />
    );

    return (
      <section className="Shop">
        <header>
          <h1>{this.props.shopName}</h1>
          <button>Добавить товар</button>
        </header>
        <main><table>
          <thead><tr>
            <th>Фото</th>
            <th>Название, описание</th>
            <th>Категория</th>
            <th>Цена</th>
            <th>В&nbsp;наличии</th>
          </tr></thead>
          <tbody>
            {productsCode}
          </tbody>
        </table></main>
      </section>
    );

  };

};

export default Shop;