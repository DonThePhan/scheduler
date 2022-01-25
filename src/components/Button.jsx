import React from 'react';

import 'components/Button.scss';
import classNames from 'classnames';

export default function Button(props) {
  const { confirm, danger, disabled, onClick, children } = props;
  let buttonClass = classNames('button', { 'button--confirm': confirm, 'button--danger': danger });

  return (
    <button disabled={disabled} onClick={onClick} className={buttonClass}>
      {children}
    </button>
  );
}
