import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import CenteredText from './CenteredText';
import SkipPrompt from './SkipPrompt';
import { handleEndCinematic } from '../redux/gameSlice';

const Container = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  text-align: center;
`;

const timeouts = [];

const IntroCinematic = props => {
  const [textAnim, setTextAnim] = React.useState(false);
  React.useEffect(() => {
    if(props.active) {
      setTextAnim(true);
      timeouts.push(setTimeout(() => setTextAnim(false), 5000));
      timeouts.push(setTimeout(() => dispatch(handleEndCinematic()), 7000));
    }
  }, [props.active]);
  const dispatch = useDispatch();
  const skipFunc = () => {
    if(timeouts.length > 0) {
      timeouts.forEach(t => clearInterval(t));
    }
    dispatch(handleEndCinematic());
  };
  return (
    <Container onClick={() => skipFunc()} style={{ display: props.active ? 'block' : 'none' }}>
      <CenteredText delay={1000} text={'A dirt backroad.'} visible={textAnim} />
      <CenteredText delay={2000} text={'Caledonia County, Vermont.'} visible={textAnim} />
      <CenteredText delay={3500} text={'December 13th, 1987. 9:44PM'} visible={textAnim} />
      <SkipPrompt visible={textAnim} />
    </Container>
  );
};

IntroCinematic.propTypes = {
  active: PropTypes.bool
};

export default IntroCinematic;