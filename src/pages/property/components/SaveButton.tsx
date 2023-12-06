import { LoadingButton } from "@mui/lab";
import { styled } from "@mui/material";

export const SaveButton = styled(LoadingButton)(({ loading }) => ({
    backgroundColor: loading ? "#ccc" : "#4CAF50",
    color: "white",
    padding: "10px 20px",
    fontSize: "16px",
    borderRadius: "5px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.5)",
    "&:disabled": {
        backgroundColor: loading ? "#ccc" : undefined,
    },
}));
