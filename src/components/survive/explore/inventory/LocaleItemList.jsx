import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import ListButtonItem from './ListButtonItem';
import InventoryHeader from './InventoryHeader';
import { takeItem } from '../../redux/playerSlice';
import { openContainer } from '../../redux/worldSlice';
import { getItemAmountSpan } from '../../SurviveUtils';
import ContainerItemList from './ContainerItemList';
import { getItemDisplayName } from '../../world/Items';

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
  const playerData = useSelector(state => ({
    equipped: state.player.equipped,
    localeName: state.player.locale
  }));
  const containers = useSelector(state => state.world[playerData.localeName].containers);
  const items = useSelector(state => state.world[playerData.localeName].items);
  const containerClickFunc = container => dispatch(openContainer({ localeName: playerData.localeName, container }));
  const itemClickFunc = (localeName, item) => dispatch(takeItem({ localeName: playerData.localeName, item }));
  return (
    <React.Fragment>
      <InventoryHeader text={playerData.localeName} />
      <List>
        {containers.length < 1 ? null : containers.map(container => (
          <ContainerItemList
            key={`${container.containerId}_list`}
            container={container}
            containerClickFunc={containerClickFunc}
            itemClickFunc={item => itemClickFunc(playerData.localeName, item)} />
        ))}
        {items.length < 1 && containers.length < 1
          ? <ListButtonItem clickFunc={() => false} rgb="50, 50, 50" text="(nothing here)" />
          : items.map(item => (
            <ListButtonItem
              key={item.entityId}
              clickFunc={() => itemClickFunc(playerData.localeName, item)}
              subText={getItemAmountSpan(item.amount)}
              text={getItemDisplayName(item.name)} />
          ))}
      </List>
    </React.Fragment>
  );
};

export default LocaleItemList;
