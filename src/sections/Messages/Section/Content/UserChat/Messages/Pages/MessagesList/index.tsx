import {
    forwardRef,
    useCallback,
    useImperativeHandle,
    useLayoutEffect,
    useState,
} from "react";
import getMessage from "./getMessage";
import { IMessageRes } from "@/types/messages";

export interface MessagesListRef {
    getMessagesCount: () => number;
    prependMessages: (m: IMessageRes[]) => void;
    appendMessage: (m: IMessageRes) => void;
}

interface MessagesListProps {
    currentUserId: number;
    onLoad: VoidFunction;
}

const MessagesList = forwardRef<MessagesListRef, MessagesListProps>(
    ({ currentUserId, onLoad }, ref) => {
        const [messages, setMessages] = useState<IMessageRes[]>([]);

        const getMessagesCount = () => messages.length;

        const prependMessages = useCallback(
            (m: IMessageRes[]) => setMessages((old) => [...m, ...old]),
            []
        );

        const appendMessage = useCallback(
            (m: IMessageRes) => setMessages((old) => [...old, m]),
            []
        );

        useImperativeHandle(
            ref,
            () => ({
                getMessagesCount,
                prependMessages,
                appendMessage,
            }),
            [getMessagesCount]
        );

        // INFO: use to fetch initial page
        useLayoutEffect(() => {
            onLoad();
        }, []);

        return <>{messages?.map(getMessage(currentUserId))}</>;
    }
);

export default MessagesList;
