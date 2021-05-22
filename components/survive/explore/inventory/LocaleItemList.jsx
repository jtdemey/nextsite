import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import ListButtonItem from './ListButtonItem';
import InventoryHeader from './InventoryHeader';
import { takeItem } from '../../redux/playerSlice';

const List = styled.ul`
  position: relative;
  top: 0;
  left: 0;
  margin: 0;
  padding: 0.5rem 0 0;
  list-style-type: none;
`;

const LocaleItemList = () => {
  const dispatch = useDispatch();
  const playerLocale = useSelector(state => state.player.locale);
  const items = useSelector(state => state.world[playerLocale].items);
  const clickFunc = (localeName, item) => dispatch(takeItem({ localeName, item }));
  return (
    <React.Fragment>
      <InventoryHeader text={playerLocale} />
      <List>
        {items.length < 1 ? <ListButtonItem clickFunc={() => false} rgb="50, 50, 50" text="(nothing here)" /> : items.map((item, i) => (
          <ListButtonItem key={item.itemId} clickFunc={() => clickFunc(playerLocale, item)} text={item.display} />
        ))}
      </List>
    </React.Fragment>
  );
};

export default LocaleItemList;