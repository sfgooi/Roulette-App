import { IoMdAdd } from "react-icons/io";
import { styled } from "@mui/material";

const StyledDiv = styled("div")({
  padding: "4px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "&:hover": { opacity: 0.7 },
  "&:focus": { outline: "none" },
});

type Props = {
  onAdd: () => void;
};

const TabAddButton: React.FC<Props> = ({ onAdd }) => {
  return (
    <StyledDiv onClick={onAdd}>
      <IoMdAdd />
    </StyledDiv>
  );
};

export default TabAddButton;
