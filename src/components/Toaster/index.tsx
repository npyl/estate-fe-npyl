import DoneIcon from "@mui/icons-material/Done";
import ErrorIcon from "@mui/icons-material/Error";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { FC } from "react";

// ----------------------------------------------------------------------------

import { toast } from "react-hot-toast";

interface ToastProps {
    t: RHTToast;
}

const Toast: FC<ToastProps> = ({ t }) => {
    const { type, message } = t || {};

    toast.te;

    const icon =
        type === "success" ? (
            <DoneIcon />
        ) : type == "error" ? (
            <ErrorIcon />
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
            borderColor="divider"
            bgcolor="background.paper"
            minHeight="50px"
            direction="row"
            spacing={1}
            py="22px"
            px="38px"
            borderRadius="20px"
        >
            {icon}
            {MESSAGE}
        </Stack>
    );
};

// ----------------------------------------------------------------------------

const getToast = (t: RHTToast) => <Toast t={t} />;

// ----------------------------------------------------------------------------

const Toaster = () => <RHTToaster position="top-right">{getToast}</RHTToaster>;

export default Toaster;
