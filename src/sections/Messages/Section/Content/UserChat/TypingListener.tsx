import useDialog from "@/hooks/useDialog";
import useChatService, {
    EVENTS,
    useApplyListener,
} from "@/sections/Messages/useChatService";
import { Typography } from "@mui/material";

const TypingListener = () => {
    const [isTyping, onTypingStarted, onTypingStopped] = useDialog();

    const { socket } = useChatService();
    useApplyListener(socket, EVENTS.USER_TYPING_STARTED, onTypingStarted);
    useApplyListener(socket, EVENTS.USER_TYPING_STOPPED, onTypingStopped);

    if (isTyping) return <Typography>O xristis grafei....</Typography>;

    return null;
};

export default TypingListener;
