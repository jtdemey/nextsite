import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import ConsoleOutput from './ConsoleOutput';

const Pane = styled.div`
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
  const consoleLines = useSelector(state => state.game.consoleText);
  React.useEffect(() => {
    if(consoleRef.current) {
			consoleRef.current.scrollTo(0, consoleRef.current.scrollHeight);
    }
  }, [consoleLines]);
  return (
    <Pane ref={consoleRef}>
      <ConsoleOutput consoleLines={consoleLines} />
    </Pane>
  );
};

export default ConsolePane;