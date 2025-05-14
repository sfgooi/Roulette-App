import { Wheel } from "react-custom-roulette";
import { generateWheelColors } from "../../utils/generateWheelColors";
import { Member } from "../../api/dynamoDB/types";

type Props = {
  mustStartSpinning: boolean;
  prizeNumber: number;
  members: Member[];
  onStopSpinning: () => void;
};

const RouletteWheel: React.FC<Props> = ({
  mustStartSpinning,
  prizeNumber,
  members,
  onStopSpinning,
}) => {
  // メンバーの数に応じた色を生成
  const wheelColors = generateWheelColors(members.length);

  // サイズに基づいてデータと色を複製
  const wheelData = members.flatMap((member) =>
    Array(member.size).fill({ option: member.memberName })
  );

  // 各メンバーの色を、そのメンバーのサイズの数だけ複製
  const backgroundColors = members.flatMap((member, index) =>
    Array(member.size).fill(wheelColors[index])
  );

  return (
    <Wheel
      mustStartSpinning={mustStartSpinning}
      prizeNumber={prizeNumber}
      data={wheelData}
      onStopSpinning={onStopSpinning}
      backgroundColors={backgroundColors}
      textColors={Array(wheelData.length).fill("#fff")}
      outerBorderWidth={2}
      innerBorderWidth={2}
      radiusLineWidth={2}
      spinDuration={0.3}
    />
  );
};

export default RouletteWheel;
