import { LoadingButton, LoadingButtonProps } from "@mui/lab";
import { styled } from "@mui/material";
import { useEffect, useState } from "react";

const StyledButton = styled(LoadingButton)(({ loading }) => ({
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

interface SaveButtonProps extends Omit<LoadingButtonProps, "loading"> {
    error: boolean;
}

export const SaveButton = ({ error, onClick, ...props }: SaveButtonProps) => {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (error) setLoading(false);
    }, [error]);

    return (
        <StyledButton
            loading={loading}
            disabled={loading}
            {...props}
            onClick={(e) => {
                setLoading(true);
                onClick && onClick(e);
            }}
        />
    );
};
