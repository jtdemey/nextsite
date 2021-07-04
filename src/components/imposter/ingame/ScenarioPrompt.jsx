import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { addAOrAn } from '../ImposterUtils';

const Prompt = styled.div`
	text-align: center;
`;

const getPlayerRole = (sockId, roles) => {
  const res = roles.filter(r => r.socketId === sockId);
  if(res.length < 1) {
    console.error(`ScenarioPrompt unable to find role for ${sockId}`, roles);
  }
  return res[0].role;
};

const parseRole = roleName => {
  let base = roleName.toLowerCase();
  let result = "You're ";
  if(base.substring(0, 3) === 'the') {
    return result + base;
  }
  return `${result} ${addAOrAn(base)}`;
};

const ScenarioPrompt = props => {
	const state = useSelector(state => ({
		condition: state.game.condition,
		roles: state.game.roles,
		scenario: state.game.scenario
	}));
	return (
		<Prompt>
			<h3>{parseRole(getPlayerRole(props.socketId, state.roles))}</h3>
      <h3>in {addAOrAn(state.scenario.toLowerCase())},</h3>
      <h3>but {state.condition.toLowerCase()}.</h3>
		</Prompt>
	);
};

ScenarioPrompt.propTypes = {
	socketId: PropTypes.string
};

export default ScenarioPrompt;