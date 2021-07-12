import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { getTheme } from '../ImposterUtils';

const Container = styled.div`
	padding: 0.5rem;
`;

const Notification = styled.div`
	border-radius: 0.5rem;
	color: #fff;
	font-family: 'Source Sans Pro', sans-serif;
	font-size: 1.1rem;
	height: 36px;
	max-width: 80%;
  margin: auto;
  padding-top: 0.3em;
  text-align: center;
	& > p {
		margin: 0;
		padding-top: 0.25rem;
	}
`;

const NotificationArea = () => {
	const state = useSelector(state => ({
		notifications: state.game.notifications,
		theme: state.game.theme
	}));
	const theme = getTheme(state.theme);
	return (
		<Container style={{ display: state.notifications.length ? 'block' : 'none' }}>
			{state.notifications.map((notification, i) => (
				<Notification key={i} style={{
					border: `4px solid ${theme.highlight}`
				}}>
					<p>{notification.text}</p>
				</Notification>
			))}
		</Container>
	);
};

export default NotificationArea;