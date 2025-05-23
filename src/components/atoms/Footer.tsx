import styled from "styled-components";

const StyledFooter = styled.footer`
  font-size: 0.8rem;
  position: fixed;
  bottom: 10px;
  width: 100%;
  text-align: center;
`;

type Props = {
  text: string;
};

const Footer: React.FC<Props> = ({ text }) => {
  return <StyledFooter>{text}</StyledFooter>;
};

export default Footer;
