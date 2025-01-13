import useChatService, {
    EVENTS,
    useApplyListener,
} from "@/sections/Messages/useChatService";
import { useCallback, useState } from "react";
import UserTyping from "./UserTyping";

// -----------------------------------------------------------------------------------

interface ITypingUser {
    userId: string;
    conversationId: string;
}

const TypingListener = () => {
    const [userTyping, setUserTyping] = useState<ITypingUser>();
    const { userId } = userTyping || {};
    const onTypingStopped = useCallback(() => setUserTyping(undefined), []);

    const { socket } = useChatService();
    useApplyListener(socket, EVENTS.USER_TYPING_STARTED, setUserTyping);
    useApplyListener(socket, EVENTS.USER_TYPING_STOPPED, onTypingStopped);

    if (userId) return <UserTyping userId={userId} />;

    return null;
};

export default TypingListener;
