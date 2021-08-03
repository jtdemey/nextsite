import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { animated, useSpring } from '@react-spring/web';
import styled from 'styled-components';
import ItemActions from '../../world/ItemActions';
import { getTheme } from '../../ui/themes';

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

const getBtns = (item, dispatch) => {
	const result = [];
	const genBtn = (text, clickFunc) => ({ text, clickFunc });
	const addBtn = (text, clickFunc) => {
		if(clickFunc !== undefined) {
			result.push(genBtn(text, () => dispatch(clickFunc())))
		}
	};
	const itemActions = ItemActions[item.name];
	addBtn('Consume', itemActions.onConsume);
	addBtn('Equip', itemActions.onEquip);
	addBtn('Unequip', itemActions.onUnequip);
	addBtn('Use', itemActions.onUse);
	return result;
};

const InventoryItemBtns = props => {
  const theme = getTheme(useSelector(state => state.player.region));
	const dispatch = useDispatch();
	const btns = getBtns(props.item, dispatch);
  const [spring, api] = useSpring(() => ({ opacity: 0, y: -8 }));
  React.useEffect(() => api.start({ opacity: 1, y: 0 }));
  return (
		<Container>
			<TextArea style={{ background: theme.base3, ...spring }}>
				{props.item.description}
			</TextArea>
      <BtnContainer style={{
        background: theme.base3,
        gridTemplateColumns: `repeat(${btns.length < 3 ? 3 : btns.length}, 1fr)`,
        ...spring
			}}>
				{btns.map((btn, i) => (
          <Btn
            key={i}
            onClick={() => btn.clickFunc()}
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
