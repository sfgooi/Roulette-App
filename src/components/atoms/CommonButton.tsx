import { Button, styled } from "@mui/material";

const StyledMuiButton = styled(Button)({
  margin: "0.5em",
  padding: "8px 24px",
  borderRadius: "8px",
  textTransform: "none",
  fontSize: "1rem",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
  },
});

type Props = {
  color: "primary" | "secondary" | "error" | "warning" | "info" | "success";
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
};

const CommonButton: React.FC<Props> = ({
  color,
  onClick,
  disabled = false,
  children,
}) => {
  return (
    <StyledMuiButton
      variant="contained"
      color={color}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </StyledMuiButton>
  );
};

export default CommonButton;
