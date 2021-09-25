import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { animated, useSpring } from '@react-spring/web';
import styled from 'styled-components';

const Container = styled.div`
	display: flex;
	justify-content: center;
	position: absolute;
  bottom: 0px;
	width: 100%;
`;

const Input = styled(animated.input)`
  width: 80%;
  height: 2rem;
  margin: 0 0 1rem;
  padding: 0 0.5rem;
  border: none;
	background: none;
	border-bottom: 1px solid rgba(30, 21, 4, 0.9);
  box-shadow: none;
  color: #130F04;
  font-family: 'DM Sans', sans-serif;
	font-size: 1rem;
  &:focus {
    outline: none;
  }
`;

const handleChange = (e, setTextVal) => {
  setTextVal(e.target.value);
};

const handleKeyDown = (e, dispatch, textVal, setTextVal) => {
  if (e.keyCode === 13) {
    //Enter
    //dispatch(submitExploreCommand(textVal));
    setTextVal('');
  }
};

const CombatInput = props => {
  const [textVal, setTextVal] = React.useState('');
  const [spring, api] = useSpring(() => ({ opacity: 0, y: 10 }));
  React.useEffect(() => api.start({ opacity: 1, y: 0 }));
  const dispatch = useDispatch();
  return (
		<Container>
			<Input
				type="text"
				placeholder=">>"
				onChange={e => handleChange(e, setTextVal)}
				onKeyDown={e => handleKeyDown(e, dispatch, textVal, setTextVal)}
				ref={props.inputRef}
				style={spring}
				value={textVal}
			/>
		</Container>
  );
};

CombatInput.propTypes = {
  inputRef: PropTypes.object
};

export default CombatInput;