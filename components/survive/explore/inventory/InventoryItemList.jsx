import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import ListButtonItem from './ListButtonItem';
import InventoryHeader from './InventoryHeader';

const List = styled.ul`
  position: relative;
  top: 0;
  left: 0;
  margin: 0;
  padding: 0.5rem 0 0;
  list-style-type: none;
`;

const InventoryItemList = () => {
  const items = useSelector(state => state.player.items);
  console.log(items)
  return (
    <React.Fragment>
      <InventoryHeader text="Inventory" />
      <List>
        {items.length < 1 ? <ListButtonItem rgb="50, 50, 50" text="(nothing)" /> : items.map((item, i) => (
          <ListButtonItem key={item.itemId} subText={item.amount > 1 ? `(${item.amount})` : ''} text={item.display} />
        ))}
      </List>
    </React.Fragment>
  );
};

export default InventoryItemList;