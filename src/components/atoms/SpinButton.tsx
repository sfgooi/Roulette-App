import styled from "styled-components";
import { Button } from "@mui/material";

const SpinButtonStyled = styled(Button)`
  && {
    margin: 1rem;
    padding: 18px 60px;
    border-radius: 60px;
    text-transform: none;
    font-size: 1.4rem;
    font-weight: 800;
    letter-spacing: 1px;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 50%, #feca57 100%);
    background-size: 200% 200%;
    box-shadow: 0 10px 40px rgba(245, 87, 108, 0.5),
      0 0 50px rgba(240, 147, 251, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3);
    border: 3px solid rgba(255, 255, 255, 0.5);
    color: #ffffff;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    position: relative;
    overflow: hidden;
    animation: gradientShift 3s ease infinite;

    @keyframes gradientShift {
      0%,
      100% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
    }

    &::before {
      content: "";
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: radial-gradient(
        circle,
        rgba(255, 255, 255, 0.3) 0%,
        transparent 70%
      );
      transform: scale(0);
      transition: transform 0.6s ease-out;
    }

    &::after {
      content: "🎰";
      position: absolute;
      right: 20px;
      font-size: 1.5rem;
      animation: spin 2s linear infinite;
    }

    @keyframes spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }

    &:hover {
      transform: translateY(-5px) scale(1.05);
      box-shadow: 0 15px 50px rgba(245, 87, 108, 0.7),
        0 0 70px rgba(240, 147, 251, 0.6),
        inset 0 1px 0 rgba(255, 255, 255, 0.5);
      border-color: rgba(255, 255, 255, 0.8);

      &::before {
        transform: scale(1);
      }

      &::after {
        animation-duration: 0.5s;
      }
    }

    &:active {
      transform: translateY(-2px) scale(1.02);
    }

    &.Mui-disabled {
      background: linear-gradient(135deg, #555 0%, #777 100%);
      color: rgba(255, 255, 255, 0.4);
      box-shadow: none;
      border-color: rgba(255, 255, 255, 0.2);
      animation: none;

      &::after {
        animation: none;
        opacity: 0.3;
      }
    }
  }
`;

type Props = {
  onClick: () => void;
  disabled: boolean;
};

const SpinButton: React.FC<Props> = ({ onClick, disabled }) => {
  return (
    <SpinButtonStyled variant="contained" onClick={onClick} disabled={disabled}>
      ルーレット開始
    </SpinButtonStyled>
  );
};

export default SpinButton;
