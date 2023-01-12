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
    alerts: {
      prodName: this.props.mode === 'add' ? 'Заполните это поле.' : null,
      prodCtgr: this.props.mode === 'add' ? 'Выберите значение из\xa0списка.' : null,
      prodImgURL: this.props.mode === 'add' ? 'Заполните это поле.' : null,
      prodInStock: this.props.mode === 'add' ? 'Заполните это поле.' : null,
      prodPrice: this.props.mode === 'add' ? 'Заполните это поле.' : null,
    },
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
        alerts: {
          prodName: this.props.mode === 'add' ? 'Заполните это поле.' : null,
          prodCtgr: this.props.mode === 'add' ? 'Выберите значение из\xa0списка.' : null,
          prodImgURL: this.props.mode === 'add' ? 'Заполните это поле.' : null,
          prodInStock: this.props.mode === 'add' ? 'Заполните это поле.' : null,
          prodPrice: this.props.mode === 'add' ? 'Заполните это поле.' : null,
        },
      });
    }
  };

  getTitle = () => {
    switch (this.props.mode) {
      case 'view':
        return 'Просмотр товара';
      case 'edit':
        return 'Редактирование товара';
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

    let newAlerts = Object.assign({}, this.state.alerts);

    switch (fieldName) {
      case 'prodName':
        if (fieldValue.length < 1) {
          newAlerts.prodName = 'Заполните это поле.';
        }
        else {
          newAlerts.prodName = null;
        }
        break;
      case 'prodCtgr':
        if (fieldValue === '0') {
          newAlerts.prodCtgr = 'Выберите значение из\xa0списка.';
        }
        else {
          newAlerts.prodCtgr = null;
        }
        break;
      case 'prodImgURL':
        if (fieldValue.length < 1) {
          newAlerts.prodImgURL = 'Заполните это поле.';
        }
        else if (!/^https?:\/\/[^"']*\.(jpg|jpeg|png|gif|webp)$/.test(fieldValue)) {
          newAlerts.prodImgURL = 'Ссылка указана неверно либо изображения такого формата не\xa0поддерживаются.';
        }
        else {
          newAlerts.prodImgURL = null;
        }
        break;
      case 'prodInStock':
        if (!/^\d+$/.test(fieldValue)) {
          newAlerts.prodInStock = 'Укажите неотрицательное целое число.';
        }
        else {
          newAlerts.prodInStock = null;
        }
        break;
      case 'prodPrice':
        if (!/^\d+(\.\d{1,2})?$/.test(fieldValue)) {
          newAlerts.prodPrice = 'Укажите положительное число с\xa0не\xa0более чем\xa02 знаками после запятой.';
        }
        else {
          newAlerts.prodPrice = null;
        }
        break;
    }

    this.setState({
      [fieldName]: fieldValue,
      alerts: newAlerts,
    });

  };

  discardChanges = () => {
    if (this.props.mode === 'add') {
      this.props.cbDiscardChanges();
    }
    else {
      this.props.cbDiscardChanges(this.props.prodCode);
    }
  };

  getPermissionToSave = () => {
    let isSavingAllowed = true;
    for ( let field in this.state.alerts) {
      if (this.state.alerts[field]) {
        isSavingAllowed = false;
        break;
      }
    }
    return isSavingAllowed;
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
            <p className="prodDescr">{this.props.prodDescr}</p>
            <p className="prodPrice">{this.formatPrice(this.props.prodPrice)}</p>
            <p className="prodInStock">{this.props.prodInStock}</p>
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
              <span>Название</span>
              <input
                name="prodName"
                type="text"
                value={this.state.prodName}
                onChange={this.userEdits}
                className={this.state.alerts.prodName ? 'field-invalid' : null}
              />
              {
                this.state.alerts.prodName
                  ? <p className="alert">{this.state.alerts.prodName}</p>
                  : null
              }
            </label>
            <label>
              <span>Категория</span>
              <select
                name="prodCtgr"
                value={this.state.prodCtgr}
                onChange={this.userEdits}
                className={this.state.alerts.prodCtgr ? 'field-invalid' : null}
              >
                {categories.map((v, i) => <option key={i} value={i}>{v}</option>)}
              </select>
              {
                this.state.alerts.prodCtgr
                  ? <p className="alert">{this.state.alerts.prodCtgr}</p>
                  : null
              }
            </label>
            <label>
              <span>Ссылка на фото</span>
              <input
                name="prodImgURL"
                type="text"
                value={this.state.prodImgURL}
                onChange={this.userEdits}
                className={this.state.alerts.prodImgURL ? 'field-invalid' : null}
              />
              {
                this.state.alerts.prodImgURL
                  ? <p className="alert">{this.state.alerts.prodImgURL}</p>
                  : null
              }
            </label>
            <label>
              <span>Описание</span>
              <textarea
                name="prodDescr"
                value={this.state.prodDescr}
                onChange={this.userEdits}
              ></textarea>
            </label>
            <label>
              <span>Цена</span>
              <div>
                <input
                  name="prodPrice"
                  type="number"
                  min={0.01}
                  step={0.01}
                  value={this.state.prodPrice === 0 ? '' : this.state.prodPrice}
                  onChange={this.userEdits}
                  className={this.state.alerts.prodPrice ? 'field-invalid' : null}
                />
                <span>Br</span>
              </div>
              {
                this.state.alerts.prodPrice
                  ? <p className="alert">{this.state.alerts.prodPrice}</p>
                  : null
              }
            </label>
            <label>
              <span>В наличии</span>
              <div>
                <input
                  name="prodInStock"
                  type="number"
                  min={0}
                  step={1}
                  value={this.state.prodInStock === -1 ? '' : this.state.prodInStock}
                  onChange={this.userEdits}
                  className={this.state.alerts.prodInStock ? 'field-invalid' : null}
                />
                <span>шт.</span>
              </div>
              {
                this.state.alerts.prodInStock
                  ? <p className="alert">{this.state.alerts.prodInStock}</p>
                  : null
              }
            </label>
          </main>
          <footer>
            <button
              onClick={this.discardChanges}
            >Отменить</button>
            <button
              className={this.getPermissionToSave() ? null : 'button-disabled'}
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