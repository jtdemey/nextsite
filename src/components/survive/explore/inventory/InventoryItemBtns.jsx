import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { animated, useSpring } from '@react-spring/web';
import styled from 'styled-components';
import { dropItem, equipItem, unequipItem } from '../../redux/playerSlice';
import ItemActions from '../../world/ItemActions';
import { getTheme } from '../../ui/themes';
import { getItemDescription, isEquipable } from '../../world/Items';

const Container = styled.li`
  font-family: 'DM Sans', sans-serif;
  color: #fff;
`;

const TextArea = styled(animated.div)`
	width: 100%;
	min-height: 2rem;
  font-family: 'Newsreader', serif;
  font-size: 1rem;
  margin: 0;
	padding: 0.5rem 0.25rem;
	text-align: left;
`;

const BtnContainer = styled(animated.div)`
	width: 100%;
	display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  padding-bottom: 0.5rem;
`;

const Btn = styled.div`
  font-size: 0.95rem;
  margin: 0 0.25rem;
  padding: 0.25rem;
  text-align: center;
`;

const getBtns = (item, localeName, dispatch) => {
	const result = [];
	const genBtn = (text, clickFunc) => ({ text, clickFunc });
	const addBtn = (text, clickFunc) => {
		if(clickFunc !== undefined) {
      result.push(genBtn(text, e => {
        e.stopPropagation();
        dispatch(clickFunc());
      }));
		}
  };
  if(isEquipable(item.name)) {
    addBtn('Equip', () => equipItem({ entityId: item.entityId }));
    addBtn('Unequip', () => unequipItem({ entityId: item.entityId }));
  }
  const itemActions = ItemActions[item.name];
  if(itemActions) {
    itemActions.forEach(itemAction => {
      addBtn(itemAction.name, itemAction.action)
    });
  }
  addBtn('Drop', () => dropItem({ item, localeName }));
	return result;
};

const InventoryItemBtns = props => {
  const state = useSelector(state => ({
    locale: state.player.locale,
    region: state.player.region
  }));
  const theme = getTheme(state.region);
	const dispatch = useDispatch();
	const btns = getBtns(props.item, state.locale, dispatch);
  const [spring, api] = useSpring(() => ({ opacity: 0, y: -8 }));
  React.useEffect(() => api.start({ opacity: 1, y: 0 }));
  return (
    <Container onClick={e => e.stopPropagation()}>
			<TextArea style={{ background: theme.base3, ...spring }}>
				{getItemDescription(props.item.name)}
			</TextArea>
      <BtnContainer style={{
        background: theme.base3,
        gridTemplateColumns: `repeat(${btns.length < 3 ? 3 : btns.length}, 1fr)`,
        ...spring
			}}>
				{btns.map((btn, i) => (
          <Btn
            key={i}
            onClick={e => btn.clickFunc(e)}
            style={{
              background: theme.primary,
              border: `2px solid ${theme.secondary}`
            }}>{btn.text}</Btn>
				))}
			</BtnContainer>
		</Container>
  );
};

InventoryItemBtns.propTypes = {
	item: PropTypes.object
};

export default InventoryItemBtns;
