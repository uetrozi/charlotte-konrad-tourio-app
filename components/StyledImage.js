import Image from "next/image.js";
import styled from "styled-components";

export const StyledImage = styled(Image)`
  object-fit: cover;
  width: 100%;
  height: auto;
  border-radius: 8px;
  display: block;
`;
