import React from 'react';
import PropTypes from 'prop-types';
import { animated, useSpring } from '@react-spring/web';
import styled from 'styled-components';
import CommandLine from './CommandLine';
import ConsolePane from './ConsolePane';

const View = styled(animated.div)`
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const ConsoleView = props => {
  const [spring, api] = useSpring(() => ({ display: 'none', opacity: 0, y: 10 }));
  React.useEffect(() => api.start({ display: props.active ? 'block' : 'none', opacity: props.active ? 1 : 0, y: props.active ? 0 : 10 }));
  return (
    <View style={spring}>
      <ConsolePane />
      <CommandLine />
    </View>
  );
};

ConsoleView.propTypes = {
  active: PropTypes.bool
};

export default ConsoleView;