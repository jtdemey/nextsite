import React from 'react';
import { useDispatch } from 'react-redux';
import { animated, useSpring } from '@react-spring/web';
import styled from 'styled-components';
import { appendLine } from '../../redux/gameSlice';

const handleChange = (e, setTextVal) => {
  setTextVal(e.target.value);
};

const handleKeyDown = (e, dispatch, setTextVal) => {
  if(e.keyCode === 13) {  //Enter
    dispatch(appendLine());
    setTextVal('');
  }
};

const Input = styled(animated.input)`
  position: fixed;
  bottom: 61px;
  width: 100%;
  height: 2rem;
  margin: 0;
  padding: 0 0.5rem;
  background-color: #4e4b4d;
  border: none;
  background-image: none;
  box-shadow: none;
  color: #f5f5f5;
  font-family: 'DM Sans', sans-serif;
  &:focus {
    outline: none;
  }
`;

const CommandLine = () => {
  const [textVal, setTextVal] = React.useState('');
  const [spring, api] = useSpring(() => ({ opacity: 0, y: 10 }));
  React.useEffect(() => api.start({ opacity: 1, y: 0 }));
  const dispatch = useDispatch();
  return (
    <Input type="text" onChange={e => handleChange(e, setTextVal)} onKeyDown={e => handleKeyDown(e, dispatch, setTextVal)} style={spring} value={textVal} />
  );
};

export default CommandLine;