import React from 'react';
import PropTypes from 'prop-types';

import './Product.css';

class Product extends React.Component {

  static propTypes = {
    code: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    tn: PropTypes.string.isRequired,
    description: PropTypes.string,
    inStock: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    cbProductSelected: PropTypes.func.isRequired,
    isSelected: PropTypes.bool.isRequired,
    cbDeleteProduct: PropTypes.func.isRequired,
  };

  formatPrice = (num) => {
    return new Intl.NumberFormat('ru-BY', {style: 'currency', currency: 'BYN'}).format(num);
  };

  selectProduct = () => {
    this.props.cbProductSelected(this.props.code);
  };

  deleteProduct = (eo) => {
    eo.stopPropagation();
    const consentGiven = confirm(`Информация о товаре "${this.props.name}" будет удалена. Продолжить?`);
    if (consentGiven) {
      this.props.cbDeleteProduct(this.props.code);
    }
  };

  render() {

    const descr = this.props.description;

    return (
      <tr
        className={this.props.isSelected ? 'Product selected' : 'Product'}
        onClick={this.selectProduct}
      >
        <td className="Product-tn"><img src={this.props.tn}/></td>
        <td className="Product-name">
          <h3>{this.props.name}</h3>
          {descr ? <p>{descr}</p> : null}
        </td>
        <td className="Product-category">{this.props.category}</td>
        <td className="Product-price">{this.formatPrice(this.props.price)}</td>
        <td className="Product-in_stock">{this.props.inStock}</td>
        <td className="Product-controls">
          <button>Редактировать</button>
          <button
            className="button-destr"
            onClick={this.deleteProduct}
          >Удалить</button>
        </td>
      </tr>
    );

  };

};

export default Product;