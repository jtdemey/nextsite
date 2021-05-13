import React from 'react';
import { animated, useSpring } from '@react-spring/web';
import styled from 'styled-components';

const handleChange = (e, setTextVal) => {
  setTextVal(e.target.value);
};

const handleKeyDown = (e, setTextVal) => {
  if(e.keyCode === 13) {  //Enter

    setTextVal('');
  }
};

const Input = styled(animated.input)`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 2rem;
  margin: 0;
  padding: 0;
  background-color: #4e4b4d;
  border: none;
  background-image: none;
  box-shadow: none;
  color: #f5f5f5;
  &:focus {
    outline: none;
  }
`;

const CommandLine = () => {
  const [textVal, setTextVal] = React.useState('');
  const [spring, api] = useSpring(() => ({ opacity: 0, y: 10 }));
  React.useEffect(() => api.start({ opacity: 1, y: 0 }));
  return (
    <Input type="text" onChange={e => handleChange(e, setTextVal)} onKeyDown={e => handleKeyDown(e, setTextVal)} style={spring} value={textVal} />
  );
};

export default CommandLine;