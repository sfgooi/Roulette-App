import { IconButton } from "@mui/material";
import { RxCross2 } from "react-icons/rx";

type Props = {
  onClose: (onClose: boolean) => void;
  fetchMembers: () => void;
};

const CloseButton: React.FC<Props> = ({ onClose, fetchMembers }) => {
  const handleClose = async () => {
    await fetchMembers();
    onClose(false);
  };

  return (
    <IconButton sx={{ "&:focus": { outline: "none" } }} onClick={handleClose}>
      <RxCross2 />
    </IconButton>
  );
};

export default CloseButton;
