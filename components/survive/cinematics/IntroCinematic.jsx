import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import CenteredText from './CenteredText';
import SkipPrompt from './SkipPrompt';
import { skipCinematic } from '../redux/gameSlice';

const Container = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  text-align: center;
`;

const IntroCinematic = props => {
  const [textAnim, setTextAnim] = React.useState(false);
  React.useEffect(() => {
    if(props.active) {
      setTextAnim(true);
      setTimeout(() => setTextAnim(false), 5000);
      setTimeout(() => dispatch(skipCinematic()), 7000);
    }
  }, [props.active]);
  const dispatch = useDispatch();
  return (
    <Container onClick={() => dispatch(skipCinematic())} style={{ display: props.active ? 'block' : 'none' }}>
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