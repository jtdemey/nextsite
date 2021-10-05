import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import CombatConsoleLine from './CombatConsoleLine';

const Container = styled.div`
  position: absolute;
	bottom: 2rem;
	width: 100%;
	margin-top: auto;
`;

const Pane = styled.section`
  position: relative;
  bottom: 0;
  left: 0;
	height: 15rem;
  overflow-y: scroll;
  scroll-behavior: smooth;

  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 2rem;
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

const Output = styled.article`
  display: flex;
  flex-flow: column;
  width: 100%;
  justify-content: left;
  text-align: left;
  margin-top: calc(100% - 2rem);
  padding-bottom: 2rem;
`;

const CombatConsole = () => {
  const combatConsoleRef = React.useRef(null);
  const consoleLineIndex = useSelector(state => state.combat.combatLineIndex);
  const combatText = useSelector(state => state.combat.combatText);
  React.useEffect(() => {
    if (combatConsoleRef.current) {
      combatConsoleRef.current.scrollTo(
        0,
        combatConsoleRef.current.scrollHeight
      );
    }
  }, [combatText]);
  return (
    <Container>
      <Pane ref={combatConsoleRef}>
        <Output>
          {combatText.map(line => (
            <CombatConsoleLine
              key={line.index}
              currentIndex={consoleLineIndex}
              lineIndex={line.index}
              text={line.text}
            />
          ))}
        </Output>
      </Pane>
    </Container>
  );
};

export default CombatConsole;