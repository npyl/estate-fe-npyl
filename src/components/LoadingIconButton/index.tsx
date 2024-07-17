import { CircularProgress, IconButton, IconButtonProps } from "@mui/material";

interface LoadingIconButtonProps extends IconButtonProps {
    loading?: boolean;
}

const LoadingIconButton: React.FC<LoadingIconButtonProps> = ({
    loading = false,
    children,
    ...props
}) => (
    <IconButton disabled={loading} {...props}>
        {loading ? <CircularProgress size={20} /> : children}
    </IconButton>
);

export default LoadingIconButton;
