import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import ListButtonItem from './ListButtonItem';
import InventoryHeader from './InventoryHeader';
import { getItemAmountSpan } from '../../SurviveUtils';
import InventoryItemBtns from './InventoryItemBtns';

const List = styled.ul`
  position: relative;
  top: 0;
  left: 0;
  margin: 0;
  padding: 0.5rem 0 0;
  list-style-type: none;
`;

const getInventoryItemLbi = (item, index, selectedItem, setSelectedItem) => {
	const clickFunc = selectedItem === index
		? () => setSelectedItem(false)
		: () => setSelectedItem(index);
	const lbi = <ListButtonItem
								key={item.itemId}
								clickFunc={clickFunc}
								subText={getItemAmountSpan(item.amount)}
								text={item.display} />;
	if(selectedItem === index) {
		return (
			<div key={`${item.itemId}btns`}>
				{lbi}
				<InventoryItemBtns item={item} />
			</div>
		);
	}
	return lbi;
};

const InventoryItemList = () => {
	const [selectedItem, setSelectedItem] = React.useState(false);
  const items = useSelector(state => state.player.items);
	console.log(items)
  return (
    <>
      <InventoryHeader text="Inventory" />
      <List>
        {items.length < 1
					? <ListButtonItem rgb="50, 50, 50" text="(nothing)" />
					: items.map((item, i) =>
						getInventoryItemLbi(item, i, selectedItem, setSelectedItem))}
      </List>
    </>
  );
};

export default InventoryItemList;