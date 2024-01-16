import { LoadingButton, LoadingButtonProps } from "@mui/lab";
import { styled } from "@mui/material";
import { MouseEvent, useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

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

    prevent?: boolean;
    preventMessage?: string;
}

export const SaveButton = ({
    prevent,
    preventMessage,
    error,
    type,
    onClick,
    ...props
}: SaveButtonProps) => {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (error) setLoading(false);
    }, [error]);

    const handleClick = useCallback(
        (e: MouseEvent<HTMLButtonElement>) => {
            if (prevent) {
                toast.warning(preventMessage);
            } else {
                setLoading(true);
                onClick && onClick(e);
            }
        },
        [prevent, preventMessage, onClick]
    );

    return (
        <StyledButton
            loading={loading}
            disabled={loading}
            type={type}
            onClick={handleClick}
            {...props}
        />
    );
};
