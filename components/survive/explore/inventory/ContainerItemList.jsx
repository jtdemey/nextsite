import React from 'react';
import PropTypes from 'prop-types';
import { animated, useSpring } from '@react-spring/web';
import styled from 'styled-components';
import { faChevronDown, faLock, faQuestionCircle, faUnlock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ListButtonItem from './ListButtonItem';
import { getItemAmountSpan } from '../../SurviveUtils';
import { CONTAINER_STATES } from '../../redux/gameConstants';

const getContainerSvgIcon = containerState => {
  switch(containerState) {
    case CONTAINER_STATES.UNKNOWN:
      return faQuestionCircle;
    case CONTAINER_STATES.LOCKED:
      return faLock;
    case CONTAINER_STATES.UNLOCKED:
      return faUnlock;
    case CONTAINER_STATES.OPEN:
      return faChevronDown;
  }
};

const List = styled.ul`
  position: relative;
  top: 0;
  left: 0;
  margin: 0;
  padding: 0;
  list-style-type: none;
`;

const ContainerItemList = props => {
  const isOpen = props.container.containerState === CONTAINER_STATES.OPEN;
  console.log(isOpen)
  const [spring, api] = useSpring(() => ({ opacity: 0, scaleY: 0 }));
  React.useEffect(() => api.start({ opacity: isOpen ? 1 : 0, scaleY: isOpen ? 1 : 0 }));
  return (
    <List>
      <ListButtonItem key={props.container.containerId}
                      clickFunc={() => props.containerClickFunc(props.container)}
                      rgb="60, 60, 60"
                      subSvg={<FontAwesomeIcon icon={getContainerSvgIcon(props.container.containerState)} size="2x" />}
                      text={props.container.name} />
      <animated.div style={{ ...spring }}>
        {isOpen && props.container.items ? props.container.items.map(item => (
          <ListButtonItem key={item.itemId} indentationLevel={2} subText={getItemAmountSpan(item.amount)} text={item.display} />
        )) : null}
      </animated.div>
    </List>
  );
};

ContainerItemList.propTypes = {
  container: PropTypes.object,
  containerClickFunc: PropTypes.func
};

export default ContainerItemList;