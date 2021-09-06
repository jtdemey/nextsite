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
	background-image: url("survive/crow.webp");
	background-position: 50% 8rem;
	background-repeat: no-repeat;
	background-size: cover;
	@media (min-width: 836px) {
		background-position: 50% -12rem;
	}
`;

const MainMenuView = props => {
  const [spring, api] = useSpring(() => ({ opacity: 0, y: 10 }));
  React.useEffect(() => api.start({ opacity: props.active ? 1 : 0, y: props.active ? 0 : 10 }));
  return (
    <View style={{ display: props.active ? 'block' : 'none', ...spring }}>
      <MenuHeader text="The Roots Run Deep in Caledonia Forest." />
      <MainMenuList listItems={LIST_ITEMS} />
    </View>
  );
};

MainMenuView.propTypes = {
  active: PropTypes.bool
};

export default MainMenuView;