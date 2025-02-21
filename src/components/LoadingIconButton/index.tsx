import { CircularProgress, IconButton, IconButtonProps } from "@mui/material";
import { forwardRef } from "react";

interface LoadingIconButtonProps extends IconButtonProps {
    loading?: boolean;
}

const LoadingIconButton = forwardRef<HTMLButtonElement, LoadingIconButtonProps>(
    ({ loading = false, children, ...props }, ref) => (
        <IconButton ref={ref} disabled={loading} {...props}>
            {loading ? <CircularProgress size={20} /> : children}
        </IconButton>
    )
);

export default LoadingIconButton;
