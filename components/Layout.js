import TitleBar from "./TitleBar.js";
import styled from "styled-components";
import Head from "next/head.js";

const Main = styled.main`
  font: poppins;
  display: grid;
  gap: 0.5rem;
  margin-top: 5rem;
  padding: 0 80px 0 80px;

  position: relative;
  width: 100%;
`;

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>WanderWays</title>
      </Head>
      <TitleBar />
      <Main>{children}</Main>
    </>
  );
}
