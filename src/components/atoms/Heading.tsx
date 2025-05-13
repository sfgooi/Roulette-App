import styled from "styled-components";

type HeadingProps = {
  text: string;
};

const Heading = ({ text }: HeadingProps) => {
  return <StyledHeading>{text}</StyledHeading>;
};

const StyledHeading = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  color: #000;
`;

export default Heading;
