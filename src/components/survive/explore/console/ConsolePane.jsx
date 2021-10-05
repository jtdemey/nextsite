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

  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 0.2rem;
    background-color: transparent;
  }

  &::-webkit-scrollbar {
    width: 12px;
    background-color: rgba(1, 1, 1, 0.1);
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: rgba(60, 60, 60, 0.5);
		border: 1px solid rgba(80, 80, 80, 0.6);
  }
`;

const ConsolePane = () => {
  const consoleRef = React.useRef(null);
  const consoleLines = useSelector(state => state.game.consoleText);
  React.useEffect(() => {
    if (consoleRef.current) {
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