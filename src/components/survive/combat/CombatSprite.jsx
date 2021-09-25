import React from 'react';
import PropTypes from 'prop-types';
import { animated, useSpring } from '@react-spring/web';
import styled from 'styled-components';
import { getRunnySpring } from '../ui/springs';

const Container = styled(animated.section)`
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Image = styled.img`
	max-width: 100%;
	max-height: 100%;
	padding: 0 0.5rem;
	margin: -20% 0;
	z-index: 1;
`;

const CombatSprite = props => {
  const [spring, api] = useSpring(() =>
    getRunnySpring({ opacity: 0, y: -5 })
  );
  React.useEffect(() =>
    api.start({ opacity: 1, y: 0 })
  );
  return (
		<Container style={spring}>
			<Image loading="lazy" src={props.imgSrc} />
		</Container>
	);
};

CombatSprite.propTypes = {
	imgSrc: PropTypes.string
};

export default CombatSprite;