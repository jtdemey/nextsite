import styled from 'styled-components';

const Container = styled.div`
  height: 96px;
  z-index: 69;
`;

const BannerArea = styled.div`
  height: 100%;
  display: flex;
  background: linear-gradient(to right, white, #d9d9d9); 
`;

const Logo = styled.img`
  display: absolute;
  margin-left: 0.5em;
  margin-top: 0.3em;
  opacity: 0;
  -webkit-animation: fadein-now 0.5s ease-out 0s 1;
  -moz-animation: fadein-now 0.5s ease-out 0s 1;
  -o-animation: fadein-now 0.5s ease-out 0s 1;
  animation: fadein-now 0.5s ease-out 0s 1;
  animation-fill-mode: forwards;
`;

const Title = styled.h1`
  display: inline-block;
  margin-top: 18px;
  font-family: 'Abel', sans-serif;
  font-size: 3em;
  overflow: hidden;
  white-space: nowrap;
  opacity: 0;
`;

const HeaderContainer = () => (
  <Container>
    <BannerArea>
      <Logo width={90} height={90} src="/homepage/jdlogo1.svg" />
      <Title className="jd-title jd-title1">John&nbsp;</Title>
      <Title className="jd-title jd-title2">Torsten</Title>
    </BannerArea>
  </Container>
);

export default HeaderContainer;