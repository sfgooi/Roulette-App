import styled from "styled-components";

const StyledHeading = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  color: #000;
`;

type Props = {
  text: string;
};

const Heading: React.FC<Props> = ({ text }) => {
  return <StyledHeading>{text}</StyledHeading>;
};

export default Heading;
