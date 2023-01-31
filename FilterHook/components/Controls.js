import React, {useRef} from 'react';

import {myEvents} from './events';

import './Controls.css';

const Controls = props => {

  console.log('Рендеринг Controls');

  const inputRef = useRef(null);
  const checkboxRef = useRef(null);

  const requestListUpdate = () => {
    myEvents.emit('listUpdateRequested', {
      inputText: inputRef.current.value,
      checkboxChecked: checkboxRef.current.checked
    });
  };

  const reset = () => {
    if (
      inputRef.current.value ||
      checkboxRef.current.checked
    ) {
      inputRef.current.value = '';
      checkboxRef.current.checked = false;
      requestListUpdate();
    }
  };

  return (
    <header className="Controls">
      <div>
        <input
          type="text"
          placeholder="Введите что-нибудь..."
          defaultValue=""
          ref={inputRef}
          onChange={requestListUpdate}
        />
        <input
          type="button"
          value="Сбросить"
          onClick={reset}
        />
      </div>
      <label>
        <input
          type="checkbox"
          defaultChecked={false}
          ref={checkboxRef}
          onChange={requestListUpdate}
        />
        Упорядочить по алфавиту
      </label>
    </header>
  );
};

export default Controls;