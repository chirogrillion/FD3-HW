import React, {useState, useEffect} from 'react';

import {myEvents} from './events';

import './List.css';

const List = props => {

  console.log('Рендеринг List');

  const [list, setList] = useState(props.words);

  useEffect(() => {
    myEvents.addListener('listUpdateRequested', updateList);
    return () => {
      myEvents.removeListener('listUpdateRequested', updateList);
    };
  }, []);

  const updateList = (data) => {

    let newList = [...props.words];

    if (data.inputText) {
      newList = newList.filter(v => v.value.includes(data.inputText));
    }

    if (data.checkboxChecked) {
      newList = newList.sort((a, b) => (a.value > b.value) ? 1 : -1);
    }

    setList(newList);

  };

  const layout = list.map(v =>
    <li key={v.code}>{v.value}</li>
  );

  return (
    <main className="List">
      <ul>
        {layout}
      </ul>
    </main>
  );
};

export default List;