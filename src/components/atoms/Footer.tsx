import styled from "styled-components";

const StyledFooter = styled.footer`
  font-size: 0.9rem;
  position: fixed;
  bottom: 20px;
  width: 100%;
  text-align: center;
  color: rgba(255, 255, 255, 0.6);
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  font-weight: 500;
  letter-spacing: 1px;
  z-index: 1000;
  
  &::before {
    content: "✨ ";
  }
  
  &::after {
    content: " ✨";
  }
`;

type Props = {
  text: string;
};

const Footer: React.FC<Props> = ({ text }) => {
  return <StyledFooter>{text}</StyledFooter>;
};

export default Footer;
