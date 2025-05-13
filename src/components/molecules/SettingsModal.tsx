import { Modal, Box } from "@mui/material";
import MemberTable from "../organisms/MemberTable";
import { Member } from "../../api/dynamoDB/types";

type SettingsModalProps = {
  open: boolean;
  onClose: () => void;
  members: Member[];
  setMembers: React.Dispatch<React.SetStateAction<Member[]>>;
};

const SettingsModal: React.FC<SettingsModalProps> = ({
  open,
  onClose,
  members,
  setMembers,
}) => {
  return (
    <Modal open={open} onClose={onClose} aria-labelledby="settings-modal">
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "80%",
          maxWidth: 800,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <MemberTable onClose={onClose} members={members} setMembers={setMembers} />
      </Box>
    </Modal>
  );
};

export default SettingsModal;
