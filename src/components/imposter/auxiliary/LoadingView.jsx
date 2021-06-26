import React from 'react';
import { animated, useSpring } from '@react-spring/web';
import styled from 'styled-components';

const View = styled.div`
	width: 100%;
	height: 100%;
	text-align: center;
`;

const Wheel = styled.div`
	height: 40px;
	width: 40px;
	background: rgba(0, 0, 0, 0.4);
	border-radius: 50%;
	border-right: 2px solid transparent;
	border-bottom: none;
	border-left: none;
`;

const LoadingView = () => {
  return (
    <View>
			<Wheel />
    </View>
  );
};

export default LoadingView;