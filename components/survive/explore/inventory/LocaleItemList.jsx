import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import ListButtonItem from './ListButtonItem';
import { getLocale } from '../../world/World';
import InventoryHeader from './InventoryHeader';

const List = styled.ul`
  position: relative;
  top: 0;
  left: 0;
  margin: 0;
  padding: 1rem;
  list-style-type: none;
`;

const LocaleItemList = () => {
  const playerLocale = useSelector(state => state.player.locale);
  const items = getLocale(playerLocale).items;
  console.log(items.length);
  return (
    <React.Fragment>
      <InventoryHeader text={playerLocale} />
      <List>
        {items.length < 1 ? <ListButtonItem text="nothing here" /> : items.map((item, i) => (
          <ListButtonItem key={i} text={item.display} />
        ))}
      </List>
    </React.Fragment>
  );
};

export default LocaleItemList;