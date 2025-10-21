import styled from "styled-components";

const StyledHeading = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  color: #ffffff;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5), 0 0 20px rgba(138, 43, 226, 0.4);
`;

type Props = {
  text: string;
};

const Heading: React.FC<Props> = ({ text }) => {
  return <StyledHeading>{text}</StyledHeading>;
};

export default Heading;
