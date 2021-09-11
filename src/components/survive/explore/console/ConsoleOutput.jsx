import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.article`
  display: flex;
  flex-flow: column;
  width: 100%;
  justify-content: left;
  text-align: left;
  margin-top: calc(100vh - 2rem - 101px);
  padding-bottom: 2rem;
  color: #f5f5f5;
`;

const Line = styled.pre`
  min-height: 26px;
  margin: 0;
  padding: 0.1rem 0.5rem 0;
  font-family: 'Newsreader', serif;
  font-size: 1rem;
	line-height: 1.25rem;
	white-space: inherit;
`;

const ConsoleOutput = props => {
  return (
    <Container>
      {props.consoleLines.map(line => (
        <Line key={line.index}>{line.text}</Line>
      ))}
    </Container>
  );
};

ConsoleOutput.propTypes = {
  consoleLines: PropTypes.array
};

export default ConsoleOutput;