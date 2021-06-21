import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Input = styled.input`
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 1.2rem;
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