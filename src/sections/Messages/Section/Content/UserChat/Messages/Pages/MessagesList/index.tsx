import {
    forwardRef,
    useCallback,
    useImperativeHandle,
    useLayoutEffect,
    useState,
} from "react";
import getMessage from "./getMessage";
import { IMessageRes } from "@/types/messages";
import { useAuth } from "@/sections/use-auth";

export interface MessagesListRef {
    prependMessages: (m: IMessageRes[]) => void;
    appendMessage: (m: IMessageRes) => void;
    clearMessages: VoidFunction;
}

interface MessagesListProps {
    conversationId: string;
    onLoad: VoidFunction;
}

const MessagesList = forwardRef<MessagesListRef, MessagesListProps>(
    ({ conversationId, onLoad }, ref) => {
        const { user } = useAuth();
        const currentUserId = user?.id!;

        const [messages, setMessages] = useState<IMessageRes[]>([]);

        const prependMessages = useCallback(
            (m: IMessageRes[]) => setMessages((old) => [...m, ...old]),
            []
        );

        const appendMessage = useCallback(
            (m: IMessageRes) => setMessages((old) => [...old, m]),
            []
        );

        const clearMessages = useCallback(() => setMessages([]), []);

        useImperativeHandle(
            ref,
            () => ({
                prependMessages,
                appendMessage,
                clearMessages,
            }),
            []
        );

        // INFO: use to fetch initial page
        useLayoutEffect(() => {
            onLoad();
        }, [conversationId]);

        return <>{messages?.map(getMessage(currentUserId))}</>;
    }
);

export default MessagesList;
