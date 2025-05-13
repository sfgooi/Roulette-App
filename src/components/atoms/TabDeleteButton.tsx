import { RxCrossCircled } from "react-icons/rx";
import { IconButton } from "@mui/material";

const TabDeleteButton = ({onDelete }: { departmentId: number, departmentName: string, onDelete: () => void }) => {

  return (
    <IconButton
      size="small"
      sx={{
        padding: "4px",
        "&:hover": { backgroundColor: "initial" },
        "&:focus": { outline: "none" },
      }}
      onClick={onDelete}
    >
      <RxCrossCircled />
    </IconButton>
  );
};

export default TabDeleteButton