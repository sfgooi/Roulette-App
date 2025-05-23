import CommonButton from "./CommonButton";

type Props = {
  onClick: () => void;
  disabled: boolean;
};

const SpinButton: React.FC<Props> = ({ onClick, disabled }) => {
  return (
    <CommonButton color="primary" onClick={onClick} disabled={disabled}>
      開始
    </CommonButton>
  );
};

export default SpinButton;
