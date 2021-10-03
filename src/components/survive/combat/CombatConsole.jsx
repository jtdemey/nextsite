import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import CombatConsoleLine from './CombatConsoleLine';

const Container = styled.div`
  position: relative;
	margin-top: auto;
`;

const Pane = styled.section`
  position: relative;
  bottom: 0;
  left: 0;
  height: 14rem;
  overflow-y: scroll;
  scroll-behavior: smooth;
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