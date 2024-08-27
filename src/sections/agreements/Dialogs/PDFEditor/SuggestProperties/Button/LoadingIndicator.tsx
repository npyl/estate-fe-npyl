import { CircularProgress } from "./styled";
import Stack from "@mui/material/Stack";

const LoadingIndicator = () => (
    <Stack justifyContent="center" alignItems="center">
        <CircularProgress />
    </Stack>
);

export default LoadingIndicator;
