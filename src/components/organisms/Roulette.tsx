import { useState } from "react";
import SpinButton from "../atoms/SpinButton";
import RouletteWheel from "../molecules/RouletteWheel";
import { Member } from "../../api/dynamoDB/types";

const Roulette: React.FC<{ members: Member[] }> = ({ members }) => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  if (!Array.isArray(members) || members.length === 0) {
    return <div>メンバーが登録されていません</div>;
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
    <>
      <RouletteWheel
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        members={members}
        onStopSpinning={() => {
          setMustSpin(false);
        }}
      />
      <SpinButton onClick={handleSpinClick} disabled={mustSpin} />
    </>
  );
};

export default Roulette;
