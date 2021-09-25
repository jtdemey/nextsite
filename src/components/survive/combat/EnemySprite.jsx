import React from 'react';
import PropTypes from 'prop-types';
import CombatSprite from './CombatSprite';

const EnemySprite = ({ imgSrc }) => <CombatSprite imgSrc={imgSrc} />;

EnemySprite.propTypes = {
	imgSrc: PropTypes.string
};

export default EnemySprite;