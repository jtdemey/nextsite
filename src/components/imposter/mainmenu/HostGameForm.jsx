import React from 'react';
import styled from 'styled-components';
import FormInput from './FormInput';

const Form = styled.form`
	width: 100%;
`;

const HostGameForm = () => {
  return (
    <Form>
			<FormInput placeholder="Your name" />
			<FormInput placeholder="Game code" />
    </Form>
  );
};

export default HostGameForm;