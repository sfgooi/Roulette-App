import { useState } from "react";
import styled from "styled-components";
import SpinButton from "../atoms/SpinButton";
import RouletteWheel from "../molecules/RouletteWheel";
import { Member } from "../../api/dynamoDB/types";

const RouletteContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 2rem;
  position: relative;
`;

const WheelContainer = styled.div`
  position: relative;
  filter: drop-shadow(0 0 30px rgba(138, 43, 226, 0.6))
    drop-shadow(0 0 60px rgba(0, 191, 255, 0.4))
    drop-shadow(0 10px 40px rgba(0, 0, 0, 0.5));
  animation: wheelGlow 4s ease-in-out infinite;

  @keyframes wheelGlow {
    0%,
    100% {
      filter: drop-shadow(0 0 30px rgba(138, 43, 226, 0.6))
        drop-shadow(0 0 60px rgba(0, 191, 255, 0.4))
        drop-shadow(0 10px 40px rgba(0, 0, 0, 0.5));
    }
    50% {
      filter: drop-shadow(0 0 50px rgba(138, 43, 226, 0.9))
        drop-shadow(0 0 80px rgba(0, 191, 255, 0.6))
        drop-shadow(0 10px 40px rgba(0, 0, 0, 0.5));
    }
  }

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 110%;
    height: 110%;
    border-radius: 50%;
    background: radial-gradient(
      circle,
      transparent 45%,
      rgba(138, 43, 226, 0.2) 50%,
      rgba(0, 191, 255, 0.2) 55%,
      transparent 60%
    );
    animation: ringPulse 3s ease-in-out infinite;
    pointer-events: none;
    z-index: -1;
  }

  @keyframes ringPulse {
    0%,
    100% {
      transform: translate(-50%, -50%) scale(1);
      opacity: 0.6;
    }
    50% {
      transform: translate(-50%, -50%) scale(1.05);
      opacity: 1;
    }
  }
`;

const ErrorMessage = styled.div`
  color: #ffffff;
  font-size: 1.2rem;
  padding: 2rem;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
`;

type Props = {
  members: Member[];
};

const Roulette: React.FC<Props> = ({ members }) => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  if (!Array.isArray(members) || members.length === 0) {
    return <ErrorMessage>メンバーが登録されていません</ErrorMessage>;
  }

  const handleSpinClick = () => {
    if (!mustSpin) {
      // サイズの合計に基づいて乱数を生成
      const totalSegments = members.reduce(
        (sum, member) => sum + member.size,
        0
      );
      const newPrizeNumber = Math.floor(Math.random() * totalSegments);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
    }
  };

  return (
    <RouletteContainer>
      <WheelContainer>
        <RouletteWheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          members={members}
          onStopSpinning={() => {
            setMustSpin(false);
          }}
        />
      </WheelContainer>
      <SpinButton onClick={handleSpinClick} disabled={mustSpin} />
    </RouletteContainer>
  );
};

export default Roulette;
