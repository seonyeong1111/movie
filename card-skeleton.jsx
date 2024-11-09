import styled from "styled-components";

const CardSkeleton = ({ num }) => {
  return new Array(num).fill(0).map((_, idx) => (
    <Container>
      <CardMain></CardMain>
      <TextWrapper>
        <TitleBox></TitleBox>
        <DescrptionBox></DescrptionBox>
      </TextWrapper>
    </Container>
  ));
};

export default CardSkeleton;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 140px;
  height: 300px;
`;

const CardMain = styled.div`
  background: lightgray;
  border-radius: 10px;
  width: 100%;
  height: 200px;
`;

const TextWrapper = styled.div`
width 100%;
height:40px;
display:flex;
flex-direction: column;
justify-content: center;
border-radius: 10px;
gap:5px;
`;

const TitleBox = styled.div`
  width: 100%;
  height: 10px;
  background: lightgray;
  border-radius: 10px;
`;

const DescrptionBox = styled.div`
  width: 100%;
  height: 10px;
  background: lightgray;
  border-radius: 10px;
`;
