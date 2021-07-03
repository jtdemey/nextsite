import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import MenuButton from '../auxiliary/MenuButton';
import { extendTimer, hurryUp } from '../redux/imposterSlice';

const Container = styled.div`
	padding: 1rem;
`;

const LobbyBtns = () => {
	const dispatch = useDispatch();
	return (
		<Container>
			<MenuButton
				clickFunc={() => dispatch(extendTimer())}
				text="Extend timer"
			/>
			<MenuButton
				clickFunc={() => dispatch(hurryUp())}
				text="Hurry up"
			/>
		</Container>
	);
};

export default LobbyBtns;