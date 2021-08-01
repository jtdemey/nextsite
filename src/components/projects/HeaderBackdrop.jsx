import React from 'react';
import { animated, useSpring } from '@react-spring/web';

const HeaderBackdrop = () => {
	const [spring, api] = useSpring(() => ({
		height: '0rem',
	}));
	React.useEffect(() => api.start(() => ({
		delay: 1000,
		height: '6rem'
	})));
  return (
    <animated.div className="header-backdrop" style={spring}>
    </animated.div>
  );
};

export default HeaderBackdrop; 