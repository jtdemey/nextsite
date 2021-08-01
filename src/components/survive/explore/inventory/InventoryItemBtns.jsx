import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

const Container = styled.div`
	height: 0.1rem;
`;

const TextArea = styled.div`
	width: 100%;
	min-height: 2rem;
	text-align: center;
`;

const BtnContainer = styled.li`
	width: 100%;
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
`;

const Btn = styled.div`
	background: #333;
`;

const getBtns = (item, dispatch) => {
	const result = [];
	const genBtn = (text, clickFunc) => ({ text, clickFunc });
	const addBtn = (text, clickFunc) => {
		if(clickFunc !== undefined) {
			result.push(genBtn(text, () => dispatch(clickFunc())))
		}
	};
	addBtn('Consume', item.events.onConsume);
	addBtn('Equip', item.events.onEquip);
	addBtn('Unequip', item.events.onUnequip);
	addBtn('Use', item.events.onUse);
};

const InventoryItemBtns = props => {
	const dispatch = useDispatch();
  return (
		<Container>
			<TextArea>
				{props.item.description}
			</TextArea>
			<BtnContainer style={{
				gridTemplateColumns: `repeat(${btns.length}, 1fr)`
			}}>
				{getBtns(props.item, dispatch).map(btn => (
					<Btn onClick={() => btn.clickFunc()}>{btn.text}</Btn>
				))}
			</BtnContainer>
		</Container>
  );
};

InventoryItemBtns.propTypes = {
	item: PropTypes.object
};

export default InventoryItemBtns;