import { Modal, Box } from "@mui/material";
import styled from "@emotion/styled";
import MemberTable from "../organisms/MemberTable";
import { Member } from "../../api/dynamoDB/types";

const StyledBox = styled(Box)({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  maxWidth: 800,
  backgroundColor: "white",
  boxShadow: "0px 4px 24px rgba(0, 0, 0, 0.25)",
  padding: "32px",
  borderRadius: "16px",
});

type Props = {
  open: boolean;
  onClose: () => void;
  members: Member[];
  setMembers: React.Dispatch<React.SetStateAction<Member[]>>;
};

const SettingsModal: React.FC<Props> = ({
  open,
  onClose,
  members,
  setMembers,
}) => {
  return (
    <Modal open={open} onClose={onClose} aria-labelledby="settings-modal">
      <StyledBox>
        <MemberTable
          onClose={onClose}
          members={members}
          setMembers={setMembers}
        />
      </StyledBox>
    </Modal>
  );
};

export default SettingsModal;
