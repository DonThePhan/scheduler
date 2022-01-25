import React from 'react';
import 'components/DayListItem.scss';
import classNames from 'classnames';

export default function DayListItem(props) {
  const { name, spots, selected, setDay } = props;

  let listClass = classNames('day-list__item', {
    'day-list__item--selected': selected,
    'day-list__item--full': spots === 0
  });

  function formatSpots(spots) {
    return `${spots ? spots : 'no'} ${spots !== 1 ? 'spots' : 'spot'} remaining`;
  }

  return (
    <li className={listClass} onClick={() => setDay(name)}>
      <h2 className="text--regular">{name}</h2>
      <h3 className="text--light">{formatSpots(spots)}</h3>
    </li>
  );
}
