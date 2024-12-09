import DoneIcon from "@mui/icons-material/Done";
import ErrorIcon from "@mui/icons-material/Error";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Toast as RHTToast } from "react-hot-toast";
import { FC } from "react";
import getBorderColor from "@/theme/borderColor";
import { Theme } from "@mui/material/styles";

const getBgColor = ({ palette: { mode } }: Theme) =>
    mode === "light" ? "background.neutral" : "background.paper";

interface ToastProps {
    t: RHTToast;
}

const Toast: FC<ToastProps> = ({ t }) => {
    const { type, message } = t || {};

    const icon =
        type === "success" ? (
            <DoneIcon color="success" />
        ) : type == "error" ? (
            <ErrorIcon color="error" />
        ) : null;

    const MESSAGE =
        typeof message === "string" ? (
            <Typography>{message || ""}</Typography>
        ) : typeof message === "function" ? (
            message(t)
        ) : (
            message
        );

    return (
        <Stack
            border="1px solid"
            borderColor={getBorderColor}
            bgcolor={getBgColor}
            minHeight="50px"
            direction="row"
            spacing={1}
            p={2}
            borderRadius="20px"
            boxShadow={15}
        >
            {icon}
            {/* ... */}
            {MESSAGE}
        </Stack>
    );
};

export default Toast;
