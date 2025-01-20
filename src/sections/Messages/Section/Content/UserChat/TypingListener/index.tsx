import useChatService, {
    EVENTS,
    TChatServiceInitCb,
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

    const serviceInit: TChatServiceInitCb = useCallback(
        (applyListener, removeListener) => {
            applyListener(EVENTS.USER_TYPING_STARTED, setUserTyping);
            applyListener(EVENTS.USER_TYPING_STOPPED, onTypingStopped);

            return () => {
                removeListener(EVENTS.USER_TYPING_STARTED, setUserTyping);
                removeListener(EVENTS.USER_TYPING_STOPPED, onTypingStopped);
            };
        },
        []
    );

    useChatService(serviceInit);

    if (userId) return <UserTyping userId={userId} />;

    return null;
};

export default TypingListener;
