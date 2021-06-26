import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Input = styled.input`
	margin: 1.25rem auto;
	padding: 0.25rem;
	border: none;
	border-radius: 0.25rem;
	box-shadow: none;
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 1.2rem;
  &:focus {
    outline: none;
  }
`;

const FormInput = props => {
	const [state, setState] = React.useState('');
  return (
    <Input
      type="text"
			onChange={e => setState(e.target.value)}
      placeholder={props.placeholder}
			value={state}
    />
  );
};

FormInput.propTypes = {
  placeholder: PropTypes.string
};

export default FormInput;