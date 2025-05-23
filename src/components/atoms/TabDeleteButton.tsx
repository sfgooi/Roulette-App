import { RxCrossCircled } from "react-icons/rx";
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
  onDelete: () => void;
};

const TabDeleteButton: React.FC<Props> = ({ onDelete }) => {
  return (
    <StyledDiv onClick={onDelete}>
      <RxCrossCircled />
    </StyledDiv>
  );
};

export default TabDeleteButton;
