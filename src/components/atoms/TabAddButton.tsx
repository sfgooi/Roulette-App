import { IconButton, styled } from "@mui/material";
import { IoMdAdd } from "react-icons/io";

const StyledIconButton = styled(IconButton)({
  padding: "4px",
  "&:hover": { backgroundColor: "initial" },
  "&:focus": { outline: "none" },
});

type Props = {
  onAdd: () => void;
};

const TabAddButton: React.FC<Props> = ({ onAdd }) => {
  return (
    <StyledIconButton size="small" onClick={onAdd}>
      <IoMdAdd />
    </StyledIconButton>
  );
};

export default TabAddButton;
