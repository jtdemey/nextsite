import React from 'react';
import PropTypes from 'prop-types';
import { useSpring } from 'react-spring';
import styled from 'styled-components';
import MenuHeader from './MenuHeader';
import MainMenuList from './MainMenuList';

const LIST_ITEMS = [
  { text: 'Embark' },
  { text: 'Load' },
  { text: 'Options' }
];

const View = styled.div`
  width: 100%;
  height: 100%;
`;

const MainMenuView = props => {
  const [showList, setShowList] = React.useState(false);
  React.useEffect(() => setTimeout(() => setShowList(true), 800), []);
  const [spring, api] = useSpring(() => ({ opacity: 0, y: 20 }));
  api.start(() => props.active ? ({ opacity: 1, y: 0 }) : ({ opacity: 0, y: 20 }));
  return (
    <View style={{
      opacity: spring.opacity,
      transform: spring.y.to(y => `translateY(${y}px)`)
    }}>
      <MenuHeader text="Survive." />
      <MainMenuList listItems={LIST_ITEMS} visible={showList} />
    </View>
  );
};

MainMenuView.propTypes = {
  active: PropTypes.bool
};

export default MainMenuView;