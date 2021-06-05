import React from 'react';
import { useDispatch } from 'react-redux';
import { animated, useSpring } from '@react-spring/web';
import styled from 'styled-components';
import { appendLine, submitExploreCommand } from '../../redux/gameSlice';

const handleChange = (e, setTextVal) => {
  setTextVal(e.target.value);
};

const handleKeyDown = (e, dispatch, textVal, setTextVal) => {
  if(e.keyCode === 13) {  //Enter
    dispatch(submitExploreCommand(textVal));
    setTextVal('');
  }
};

const Input = styled(animated.input)`
  position: absolute;
  bottom: 0px;
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
    <Input type="text" placeholder=">>" onChange={e => handleChange(e, setTextVal)} onKeyDown={e => handleKeyDown(e, dispatch, textVal, setTextVal)} style={spring} value={textVal} />
  );
};

export default CommandLine;