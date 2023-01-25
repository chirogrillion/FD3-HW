import React from 'react';
import PropTypes from 'prop-types';

import './Company.css';

import Client from './Client';
import { myEvents } from './events';

class Company extends React.PureComponent {

  static propTypes = {
    clients: PropTypes.arrayOf(PropTypes.shape({
      code: PropTypes.number.isRequired,
      lastName: PropTypes.string.isRequired,
      firstName: PropTypes.string.isRequired,
      patronym: PropTypes.string,
      balance: PropTypes.number.isRequired,
    })),
  };

  state = {
    clients: this.props.clients,
    activeTab: 'all',
    clientBeingEdited: null,
  };

  componentDidMount = () => {
    myEvents.addListener('clientDeletionRequested', this.deleteClient);
    myEvents.addListener('clientModeChanged', this.updateClientCard);
    myEvents.addListener('clientInfoChanged', this.updateClientInfo);
  };

  componentWillUnmount = () => {
    myEvents.removeListener('clientDeletionRequested', this.deleteClient);
    myEvents.removeListener('clientModeChanged', this.updateClientCard);
    myEvents.removeListener('clientInfoChanged', this.updateClientInfo);
  };

  switchTab = (eo) => {
    this.setState({activeTab: eo.target.value});
  };

  updateClientCard = (c) => {
    if (this.state.clientBeingEdited === null) {
      this.setState({clientBeingEdited: c});
    }
    else {
      this.setState({clientBeingEdited: null});
    }
  };

  updateClientInfo = (newInfo) => {
    const newList = this.state.clients.map(oldInfo =>
      oldInfo.code === newInfo.code ? newInfo : oldInfo
    );
    this.setState({clients: newList, clientBeingEdited: null});
  };

  deleteClient = (c) => {
    const newList = this.state.clients.filter(v => v.code !== c);
    this.setState({clients: newList});
  };

  getClientsLayout = () => {

    let clientsList = [...this.state.clients];

    switch (this.state.activeTab) {
      case 'all':
        break;
      case 'active':
        clientsList = clientsList.filter(v => v.balance > 0);
        break;
      case 'blocked':
        clientsList = clientsList.filter(v => v.balance <= 0);
        break;
    }

    clientsList = clientsList.map(v =>
      <Client
        key={v.code}
        mode={v.code === this.state.clientBeingEdited ? 'edit' : 'view'}
        content={v}
      />
    );
    console.log('getClientsLayout:');
    console.log(clientsList);
    return clientsList;

  };

  render() {

    console.log(`Рендеринг родительского компонента`);

    return (
      <section className="Company">
        <header>
          <h2>Клиенты</h2>
          <button>Добавить клиента</button>
        </header>
        <main><table>
          <thead><tr>
            <th>Фамилия</th>
            <th>Имя</th>
            <th>Отчество</th>
            <th>Баланс</th>
            <th>Статус</th>
            <th>Управление</th>
          </tr></thead>
          <tbody>
            {this.getClientsLayout()}
          </tbody>
        </table></main>
        <footer>
          <label className={this.state.activeTab === 'all' ? 'tab tab-active' : 'tab'}>
            <input
              type="radio"
              name="clients"
              value="all"
              checked={this.state.activeTab === 'all'}
              onChange={this.switchTab}
            />
            <h3>Все</h3>
          </label>
          <label className={this.state.activeTab === 'active' ? 'tab tab-active' : 'tab'}>
            <input
              type="radio"
              name="clients"
              value="active"
              checked={this.state.activeTab === 'active'}
              onChange={this.switchTab}
            />
            <h3>Активные</h3>
          </label>
          <label className={this.state.activeTab === 'blocked' ? 'tab tab-active' : 'tab'}>
            <input
              type="radio"
              name="clients"
              value="blocked"
              checked={this.state.activeTab === 'blocked'}
              onChange={this.switchTab}
            />
            <h3>Заблокированные</h3>
          </label>
        </footer>
      </section>
    );

  };

};

export default Company;