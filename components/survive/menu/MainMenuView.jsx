import React from 'react';
import PropTypes from 'prop-types';
import { animated, useSpring } from '@react-spring/web';
import styled from 'styled-components';
import MenuHeader from './MenuHeader';
import MainMenuList from './MainMenuList';

const LIST_ITEMS = [
  { text: 'Attempt' },
  { text: 'Load' },
  { text: 'Options' }
];

const View = styled(animated.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const MainMenuView = props => {
  const spring = useSpring({ opacity: props.active ? 1 : 0, y: props.active ? 0 : 10 });
  return (
    <View tabIndex="1" style={{...spring}}>
      <MenuHeader text="Survive." />
      <MainMenuList listItems={LIST_ITEMS} />
    </View>
  );
};

MainMenuView.propTypes = {
  active: PropTypes.bool
};

export default MainMenuView;