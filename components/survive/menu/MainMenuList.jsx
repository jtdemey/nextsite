import React from 'react';
import { animated, useSprings } from 'react-spring';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { initGame } from '../redux/gameSlice';

const MENU_ACTIONS = [
  initGame, //Attempt

];

const List = styled.ul`
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

const MainMenuList = props => {
  const [springs, api] = useSprings(props.listItems.length, i => ({ opacity: 0, x: 80 }));
  api.start(i => props.visible ? ({ opacity: 1, x: 0, delay: i * 200 }) : ({ opacity: 0, x: 80 }));
  return (
    <List>
      {springs.map((spring, i) => (
        <Li key={i} style={spring}>{props.listItems[i].text}</Li>
      ))}
    </List>
  );
};

MainMenuList.propTypes = {
  listItems: PropTypes.array
};

export default MainMenuList;