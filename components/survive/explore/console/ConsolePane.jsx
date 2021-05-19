import React from 'react';
import { useSelector } from 'react-redux';
import { animated, useSpring } from '@react-spring/web';
import styled from 'styled-components';
import ConsoleOutput from './ConsoleOutput';

const Pane = styled(animated.div)`
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  scroll-behavior: smooth;
`;

const ConsolePane = () => {
  const consoleRef = React.useRef(null);
  const consoleIndex = useSelector(state => state.game.consoleLineIndex);
  const consoleLines = useSelector(state => state.game.consoleText);
  React.useEffect(() => {
    if(consoleRef.current) {
      consoleRef.current.scrollTop = 26 * consoleIndex;
    }
  }, [consoleLines]);
  return (
    <Pane ref={consoleRef}>
      <ConsoleOutput consoleLines={consoleLines} />
    </Pane>
  );
};

export default ConsolePane;