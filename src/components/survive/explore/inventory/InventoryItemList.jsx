import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import ListButtonItem from './ListButtonItem';
import InventoryHeader from './InventoryHeader';
import { getItemAmountSpan } from '../../SurviveUtils';
import InventoryItemBtns from './InventoryItemBtns';
import { getItemDisplayName } from '../../world/Items';

const List = styled.ul`
  position: relative;
  top: 0;
  left: 0;
  margin: 0;
  padding: 0.5rem 0 0;
  list-style-type: none;
`;

const getInventoryItemLbi = (item, selectedItem, setSelectedItem, equipped) => {
	const clickFunc = selectedItem === item.entityId 
    ? () => false 
    : e => {
      e.stopPropagation();
      setSelectedItem(item.entityId);
    };
  let spanText = getItemAmountSpan(item.amount);
  if(equipped.some(e => e === item.entityId)) {
    spanText += ' (equipped)';
  }
	const lbi = <ListButtonItem
								key={item.entityId}
								clickFunc={clickFunc}
                subText={spanText}
								text={getItemDisplayName(item.name)} />;
	if(selectedItem === item.entityId) {
		return (
			<div key={`${item.entityId}btns`}>
				{lbi}
				<InventoryItemBtns item={item} />
			</div>
		);
	}
	return lbi;
};

const InventoryItemList = props => {
  const equipped = useSelector(state => state.player.equipped);
  const items = useSelector(state => state.player.items);
  return (
    <>
      <InventoryHeader text="Inventory" />
      <List>
        {items.length < 1
          ? <ListButtonItem clickFunc={() => false} rgb="50, 50, 50" text="(nothing)" />
					: items.map(item => getInventoryItemLbi(item, props.selectedItem, props.setSelectedItem, equipped))}
      </List>
    </>
  );
};

InventoryItemBtns.propTypes = {
  selectedItem: PropTypes.string,
  setSelectedItem: PropTypes.func
};

export default InventoryItemList;
