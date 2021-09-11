export const getButterySpring = props => ({
	...props,
	config: {
		mass: 1,
		tension: 240,
		friction: 20
	}
});

export const getIcySpring = props => ({
	...props,
	config: {
		mass: 2,
		tension: 420,
		friction: 150 
	}
});

export const getMolassesSpring = props => ({
	...props,
	config: {
		mass: 3,
		tension: 260,
		friction: 360 
	}
});

export const getRunnySpring = props => ({
	...props,
	config: {
		mass: 1,
		tension: 500,
		friction: 40 
	}
});

export const getSyrupySpring = props => ({
	...props,
	config: {
		mass: 4,
		tension: 320,
		friction: 28 
	}
});