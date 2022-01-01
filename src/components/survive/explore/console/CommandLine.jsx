import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { animated, useSpring } from '@react-spring/web';
import styled from 'styled-components';
import { handleSubmitExploreCommand } from '../../redux/gameSlice';

const handleChange = (e, setTextVal) => {
  setTextVal(e.target.value);
};

const handleKeyDown = (e, dispatch, textVal, setTextVal) => {
  if (e.keyCode === 13) {
    //Enter
    dispatch(handleSubmitExploreCommand(textVal));
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

const CommandLine = props => {
  const [textVal, setTextVal] = React.useState('');
  const [spring, api] = useSpring(() => ({ opacity: 0, y: 10 }));
  React.useEffect(() => api.start({ opacity: 1, y: 0 }));
  const dispatch = useDispatch();
  return (
    <Input
      type="text"
      placeholder=">>"
      onChange={e => handleChange(e, setTextVal)}
      onKeyDown={e => handleKeyDown(e, dispatch, textVal, setTextVal)}
			ref={props.inputRef}
      style={spring}
      value={textVal}
    />
  );
};

CommandLine.propTypes = {
  inputRef: PropTypes.object
};

export default CommandLine;