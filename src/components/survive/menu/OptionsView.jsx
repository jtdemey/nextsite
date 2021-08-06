import React from 'react';
import PropTypes from 'prop-types';
import { animated, useSpring } from '@react-spring/web';
import styled from 'styled-components';
import MenuHeader from './MenuHeader';
import ExitMenuButton from './ExitMenuButton';
import OptionsList from './OptionsList';
import { GAME_STATES } from '../redux/gameConstants';

const LIST_ITEMS = [
  { text: 'Save Game' },
  { text: 'Text Size' },
  { text: 'I Dunno' }
];

const View = styled(animated.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const OptionsView = props => {
  const [spring, api] = useSpring(() => ({ opacity: 0, y: 10 }));
  React.useEffect(() => api.start({ opacity: props.active ? 1 : 0, y: props.active ? 0 : 10 }));
  return (
    <View style={{ display: props.active ? 'block' : 'none', ...spring }}>
      <ExitMenuButton originState={props.inGame ? GAME_STATES.EXPLORE : GAME_STATES.MAIN_MENU} />
      <MenuHeader text="Options" />
      <OptionsList listItems={LIST_ITEMS} />
    </View>
  );
};

OptionsView.propTypes = {
  active: PropTypes.bool,
  inGame: PropTypes.bool
};

export default OptionsView;
