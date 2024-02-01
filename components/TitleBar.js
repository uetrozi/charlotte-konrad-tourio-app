import styled from "styled-components";

const Headline = styled.h1`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: white;
  margin: 0;
  padding-top: 15px;
  padding: 10px;
  text-align: center;
  z-index: 1;
  font-family: 'Pacifico', cursive;
  font-size: 3.2em;

`;

export default function TitleBar() {
  return <Headline>WanderWays</Headline>;
}
