import { RxCrossCircled } from "react-icons/rx";
import { IconButton, styled } from "@mui/material";

const StyledIconButton = styled(IconButton)({
  padding: "4px",
  "&:hover": { backgroundColor: "initial" },
  "&:focus": { outline: "none" },
});

type Props = {
  onDelete: () => void;
};

const TabDeleteButton: React.FC<Props> = ({
  onDelete,
}) => {
  return (
    <StyledIconButton size="small" onClick={onDelete}>
      <RxCrossCircled />
    </StyledIconButton>
  );
};

export default TabDeleteButton;
