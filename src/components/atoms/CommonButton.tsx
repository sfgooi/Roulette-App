import { Button, styled } from "@mui/material";

const StyledMuiButton = styled(Button)({
  margin: "0.5em",
  padding: "12px 36px",
  borderRadius: "50px",
  textTransform: "none",
  fontSize: "1.1rem",
  fontWeight: 700,
  transition: "all 0.3s ease",
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  boxShadow:
    "0 8px 30px rgba(102, 126, 234, 0.4), 0 0 40px rgba(138, 43, 226, 0.3)",
  border: "2px solid rgba(255, 255, 255, 0.3)",
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: "-100%",
    width: "100%",
    height: "100%",
    background:
      "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)",
    transition: "left 0.5s ease",
  },
  "&:hover": {
    transform: "translateY(-3px) scale(1.02)",
    boxShadow:
      "0 12px 40px rgba(102, 126, 234, 0.6), 0 0 60px rgba(138, 43, 226, 0.5)",
    background: "linear-gradient(135deg, #764ba2 0%, #667eea 100%)",
    "&::before": {
      left: "100%",
    },
  },
  "&:active": {
    transform: "translateY(-1px) scale(0.98)",
  },
  "&.Mui-disabled": {
    background: "linear-gradient(135deg, #555 0%, #777 100%)",
    color: "rgba(255, 255, 255, 0.5)",
    boxShadow: "none",
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
