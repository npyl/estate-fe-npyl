import DoneIcon from "@mui/icons-material/Done";
import ErrorIcon from "@mui/icons-material/Error";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import toast, {
    Renderable,
    Toast as RHTToast,
    ValueOrFunction,
} from "react-hot-toast";
import {
    FC,
    ReactElement,
    cloneElement,
    isValidElement,
    useCallback,
} from "react";
import getBorderColor from "@/theme/borderColor";
import { Theme } from "@mui/material/styles";

const getBgColor = ({ palette: { mode } }: Theme) =>
    mode === "light" ? "background.neutral" : "background.paper";

interface MessageRendererProps {
    t: RHTToast;
    message: ValueOrFunction<Renderable, RHTToast>;
}

const MessageRenderer: FC<MessageRendererProps> = ({ t, message }) => {
    const onDismiss = useCallback(() => toast.dismiss(t.id), [t.id]);

    // Case 1: string
    if (typeof message === "string") {
        return <Typography>{message || ""}</Typography>;
    }

    // Case 2: Function message
    if (typeof message === "function") {
        const renderedMessage = message(t);

        if (typeof renderedMessage === "string")
            return <Typography>{renderedMessage || ""}</Typography>;

        if (isValidElement(renderedMessage))
            return cloneElement(renderedMessage as ReactElement, {
                onDismiss,
            });

        return renderedMessage;
    }

    // Case 3: React element message
    if (isValidElement(message)) {
        return cloneElement(message as ReactElement, { onDismiss });
    }

    // Case 4: null
    return null;
};

interface ToastProps {
    t: RHTToast;
}

const Toast: FC<ToastProps> = ({ t }) => {
    const { type, message } = t || {};

    const icon =
        type === "success" ? (
            <DoneIcon color="success" />
        ) : type === "error" ? (
            <ErrorIcon color="error" />
        ) : null;

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
            <MessageRenderer t={t} message={message} />
        </Stack>
    );
};

export default Toast;
