import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Bar = styled.div``;

const NavBar = props => {
	return (
		<Bar style={{ display: props.visible ? 'block' : 'none' }}>
			<div></div>
		</Bar>
	);
};

NavBar.propTypes = {
	visible: PropTypes.bool
};

export default NavBar;