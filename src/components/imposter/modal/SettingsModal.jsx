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
	border-radius: 0.5rem;
	overflow-y: scroll;
`;

const nullListener = e => e.stopPropagation();

const SettingsModal = props => {
	const theme = getTheme(useSelector(state => state.game.theme));
	return (
		<Body onClick={e => nullListener(e)} style={{ background: `linear-gradient(#edf2f4, #edf2f4, ${theme.highlight})`}}>
			<ModalCloseButton hideModal={props.hideModal} />
			<ThemeSelector />
		</Body>
	);
};

SettingsModal.propTypes = {
	hideModal: PropTypes.func
};

export default SettingsModal;