import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const Container = styled.div`
	padding: 0.5rem;
`;

const Notification = styled.div`
	max-width: 80%;
	height: 36px;
  margin: auto;
  text-align: center;
  padding-top: 0.3em;
`;

const NotificationArea = () => {
	const notifications = useSelector(state => state.game.notifications);
	return (
		<Container>
			{notifications.map(notification => (
				<Notification key={notification.notificationId}>
					<p>{notification.text}</p>
				</Notification>
			))}
		</Container>
	);
};

export default NotificationArea;