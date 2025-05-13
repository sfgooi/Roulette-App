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

type CommonButtonProps = {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
};

const CommonButton = ({
  onClick,
  disabled = false,
  children,
}: CommonButtonProps) => {
  return (
    <StyledMuiButton
      variant="contained"
      color="primary"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </StyledMuiButton>
  );
};

export default CommonButton;
