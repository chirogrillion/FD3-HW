import React from 'react';
import PropTypes from 'prop-types';

import categories from '../categories.json';

import './Sidebar.css';

class Sidebar extends React.Component {

  static propTypes = {
    mode: PropTypes.string.isRequired,
    prodCode: PropTypes.number.isRequired,
    prodName: PropTypes.string.isRequired,
    prodCtgr: PropTypes.number.isRequired,
    prodImgURL: PropTypes.string.isRequired,
    prodDescr: PropTypes.string,
    prodInStock: PropTypes.number.isRequired,
    prodPrice: PropTypes.number.isRequired,
    cbDisableButtons: PropTypes.func.isRequired,
    cbDiscardChanges: PropTypes.func.isRequired,
    cbSaveChanges: PropTypes.func.isRequired,
  };

  state = {
    prodName: this.props.prodName,
    prodCtgr: this.props.prodCtgr,
    prodImgURL: this.props.prodImgURL,
    prodDescr: this.props.prodDescr,
    prodInStock: this.props.prodInStock,
    prodPrice: this.props.prodPrice,
    isSavingAllowed: true,
  };

  componentDidUpdate(oldProps) {
    if (oldProps.prodCode !== this.props.prodCode) {
      this.setState({
        prodName: this.props.prodName,
        prodCtgr: this.props.prodCtgr,
        prodImgURL: this.props.prodImgURL,
        prodDescr: this.props.prodDescr,
        prodInStock: this.props.prodInStock,
        prodPrice: this.props.prodPrice,
      });
    }
  };

  getTitle = () => {
    switch (this.props.mode) {
      case 'view':
        return 'Просмотр информации о\xa0товаре';
      case 'edit':
        return 'Редактирование информации о\xa0товаре';
      case 'add':
        return 'Создание нового товара';
    }
  };

  formatCategory = (num) => {
    return categories[num];
  };

  formatPrice = (num) => {
    return new Intl.NumberFormat('ru-BY', {style: 'currency', currency: 'BYN'}).format(num);
  };

  userEdits = (eo) => {

    this.props.cbDisableButtons();

    const fieldName = eo.target.name;
    const fieldValue = eo.target.value;

    if (fieldName === 'prod-name') {
      this.setState({prodName: fieldValue});
    }
    else if (fieldName === 'prod-ctgr') {
      this.setState({prodCtgr: fieldValue});
    }
    else if (fieldName === 'prod-img_url') {
      this.setState({prodImgURL: fieldValue});
    }
    else if (fieldName === 'prod-descr') {
      this.setState({prodDescr: fieldValue});
    }
    else if (fieldName === 'prod-in_stock') {
      this.setState({prodInStock: fieldValue});
    }
    else if (fieldName === 'prod-price') {
      this.setState({prodPrice: fieldValue});
    }

  };

  discardChanges = () => {
    if (this.props.mode === 'add') {
      this.props.cbDiscardChanges();
    }
    else {
      this.props.cbDiscardChanges(this.props.prodCode);
    }
  };

  saveChanges = () => {
    const savedProd = {
      code: this.props.prodCode,
      name: this.state.prodName,
      category: parseInt(this.state.prodCtgr),
      imgURL: this.state.prodImgURL,
      description: this.state.prodDescr,
      inStock: parseInt(this.state.prodInStock),
      price: parseFloat(this.state.prodPrice),
    };
    this.props.cbSaveChanges(savedProd);
  };

  render() {

    const mode = this.props.mode;
    let layout;

    if (mode === 'view') {
      layout = (
        <React.Fragment>
          <header>
            <h1>{this.getTitle()}</h1>
          </header>
          <main>
            <img src={this.props.prodImgURL}/>
            <h3>{this.formatCategory(this.props.prodCtgr)}</h3>
            <h2>{this.props.prodName}</h2>
            <p className="prod-descr">{this.props.prodDescr}</p>
            <p className="prod-in_stock">{this.props.prodInStock}</p>
            <p className="prod-price">{this.formatPrice(this.props.prodPrice)}</p>
          </main>
        </React.Fragment>
      );
    }

    else if (mode === 'edit' || mode === 'add') {
      layout = (
        <React.Fragment>
          <header>
            <h1>{this.getTitle()}</h1>
          </header>
          <main>
            <label>
              <span>Название:</span>
              <input
                name="prod-name"
                type="text"
                value={this.state.prodName}
                onChange={this.userEdits}
              />
              <p className="warning"></p>
            </label>
            <label>
              <span>Категория:</span>
              <select
                name="prod-ctgr"
                value={this.state.prodCtgr}
                onChange={this.userEdits}
              >
                {categories.map((v, i) => <option key={i} value={i}>{v}</option>)}
              </select>
              <p className="warning"></p>
            </label>
            <label>
              <span>Ссылка на фото:</span>
              <input
                name="prod-img_url"
                type="text"
                value={this.state.prodImgURL}
                onChange={this.userEdits}
              />
              <p className="warning"></p>
            </label>
            <label>
              <span>Описание:</span>
              <textarea
                name="prod-descr"
                value={this.state.prodDescr}
                onChange={this.userEdits}
              ></textarea>
            </label>
            <label>
              <span>В наличии:</span>
              <div>
                <input
                  name="prod-in_stock"
                  type="number"
                  min={0}
                  step={1}
                  value={this.state.prodInStock}
                  onChange={this.userEdits}
                />
                <span>&nbsp;шт.</span>
              </div>
              <p className="warning"></p>
            </label>
            <label>
              <span>Цена:</span>
              <div>
                <input
                  name="prod-price"
                  type="number"
                  min={0.01}
                  step={0.01}
                  value={this.state.prodPrice}
                  onChange={this.userEdits}
                />
                <span>&nbsp;Br</span>
              </div>
              <p className="warning"></p>
            </label>
          </main>
          <footer>
            <button
              onClick={this.discardChanges}
            >Отменить</button>
            <button
              className={this.state.isSavingAllowed ? null : 'button-disabled'}
              onClick={this.saveChanges}
            >Сохранить</button>
          </footer>
        </React.Fragment>
      );
    }

    return (
      <div className="Sidebar">
        {layout}
      </div>
    );

  };

};

export default Sidebar;