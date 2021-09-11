import React from 'react';
import PropTypes from 'prop-types';
import { animated, useSpring } from '@react-spring/web';
import styled from 'styled-components';
import { getMolassesSpring } from '../ui/springs';

const Container = styled(animated.section)`
	display: flex;
	align-items: center;
	justify-content: center;
  padding: 0.5rem;
`;

const Image = styled.img`
	max-width: 80%;
	padding: 0.5rem;
`;

const CombatSprite = props => {
  const [spring, api] = useSpring(() =>
    getMolassesSpring({ opacity: 0, y: -5 })
  );
  React.useEffect(() =>
    api.start({ opacity: 1, y: 0 })
  );
  return (
		<Container style={spring}>
			<Image src={props.imgSrc} />
		</Container>
	);
};

CombatSprite.propTypes = {
	imgSrc: PropTypes.string
};

export default CombatSprite;