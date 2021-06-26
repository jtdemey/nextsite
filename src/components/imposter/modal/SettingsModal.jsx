import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { getTheme } from '../ImposterUtils';
import ModalCloseButton from './ModalCloseButton';
import ThemeSelector from './ThemeSelector';

const Body = styled.div`
	width: 80%;
	height: 80%;
	margin: auto;
	background: #edf2f4;
	border-radius: 0.5rem;
	overflow-y: scroll;
`;

const nullListener = e => e.stopPropagation();

const SettingsModal = props => {
	const theme = getTheme(useSelector(state => state.game.theme));
	return (
		<Body onClick={e => nullListener(e)}>
			<ModalCloseButton hideModal={props.hideModal} />
			<ThemeSelector selectedTheme={theme.title} />
		</Body>
	);
};

SettingsModal.propTypes = {
	hideModal: PropTypes.func
};

export default SettingsModal;