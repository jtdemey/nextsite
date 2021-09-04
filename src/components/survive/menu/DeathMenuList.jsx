import React from 'react';
import { useDispatch } from 'react-redux';
import { animated, useSprings } from '@react-spring/web';
import styled from 'styled-components';
import { initGame, loadGame, showOptions } from '../redux/gameSlice';

const MENU_ACTIONS = [
  initGame, //Attempt
  loadGame,
  showOptions
];

const List = styled(animated.ul)`
  position: absolute;
  bottom: 0;
  right: 0;
  list-style-type: none;
  text-align: right;
  padding: 4rem 2rem;
`;

const Li = styled(animated.li)`
  padding: 0.5rem 1rem;
  opacity: 1.0;
  color: #f5f5f5;
  font-family: 'DM Sans', sans-serif;
  font-size: 1.5rem;
`;

const getListItems = dispatch => ([
	['Restart', () => window.location.reload() ],
	['Load', () => false ],
	['View Story', () => false ],
	['Quit', () => window.close() ],
]);

const DeathMenuList = () => {
  const dispatch = useDispatch();
	const listItems = getListItems(dispatch);
  const [springs, api] = useSprings(listItems.length, i => ({ opacity: 0, x: 80 }));
  React.useEffect(() => api.start(i => ({ delay: (i * 300) + 800, opacity: 1, x: 0 })), []);
  return (
    <List>
      {springs.map((spring, i) => (
        <Li key={i} onClick={() => listItems[i][1]()} style={{ color: i === 0 ? '#7d0013' : '#f5f5f5', ...spring }}>
					{listItems[i][0]}
				</Li>
      ))}
    </List>
  );
};

export default DeathMenuList;