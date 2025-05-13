import CommonButton from "./CommonButton";

const SpinButton = ({
  onClick,
  disabled,
}: {
  onClick: () => void;
  disabled: boolean;
}) => {
  return (
    <CommonButton onClick={onClick} disabled={disabled}>
      開始
    </CommonButton>
  );
};

export default SpinButton;
