import React from 'react';
import PropTypes from 'prop-types';
import { animated, useSpring } from '@react-spring/web';
import styled from 'styled-components';
import { getTheme } from '../../ui/themes';

const Container = styled(animated.div)`
	height: 0.1rem;
  font-family: 'DM Sans', sans-serif;
	color: #fff;
`;

const TextArea = styled.div`
	width: 100%;
	min-height: 2rem;
  font-family: 'Newsreader', serif;
	font-size: 1rem;
	padding: 0.25rem 0.25rem 0.5rem;
	text-align: left;
`;

const BtnContainer = styled.li`
	width: 100%;
	display: grid;
  grid-template-columns: 1fr 1fr 1fr;
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
	console.log(item)
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
  const [spring, api] = useSpring(() => ({ height: '0.1rem' }));
  React.useEffect(() => api.start({ height: '4rem' }));
  return (
		<Container style={spring}>
			<TextArea>
				{props.item.description}
			</TextArea>
			<BtnContainer style={{
        gridTemplateColumns: `repeat(${btns.length < 3 ? 3 : btns.length}, 1fr)`
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
