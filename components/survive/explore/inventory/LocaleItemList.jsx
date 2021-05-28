import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { faChevronDown, faLock, faQuestionCircle, faUnlock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ListButtonItem from './ListButtonItem';
import InventoryHeader from './InventoryHeader';
import { takeItem } from '../../redux/playerSlice';
import { openContainer } from '../../redux/worldSlice';
import { getItemAmountSpan } from '../../SurviveUtils';
import ContainerItemList from './ContainerItemList';
import { CONTAINER_STATES } from '../../redux/gameConstants';

const getContainerSvgIcon = containerState => {
  switch(containerState) {
    case CONTAINER_STATES.UNKNOWN:
      return faQuestionCircle;
    case CONTAINER_STATES.LOCKED:
      return faLock;
    case CONTAINER_STATES.UNLOCKED:
      return faUnlock;
    case CONTAINER_STATES.OPEN:
      return faChevronDown;
  }
};

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
  const localeName = useSelector(state => state.player.locale);
  const containers = useSelector(state => state.world[localeName].containers);
  const items = useSelector(state => state.world[localeName].items);
  const containerClickFunc = container => dispatch(openContainer({ localeName, container }));
  const itemClickFunc = (localeName, item) => dispatch(takeItem({ localeName, item }));
  return (
    <React.Fragment>
      <InventoryHeader text={localeName} />
      <List>
        {containers.length < 1 ? null : containers.map(container => (
          <ContainerItemList key={`${container.containerId}_list`} container={container} containerClickFunc={containerClickFunc} />
        ))}
        {items.length < 1 && containers.length < 1 ? <ListButtonItem clickFunc={() => false} rgb="50, 50, 50" text="(nothing here)" /> : items.map(item => (
          <ListButtonItem key={item.itemId} clickFunc={() => itemClickFunc(localeName, item)} subText={getItemAmountSpan(item.amount)} text={item.display} />
        ))}
      </List>
    </React.Fragment>
  );
};

export default LocaleItemList;