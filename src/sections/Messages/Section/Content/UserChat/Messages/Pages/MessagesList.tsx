import {
    forwardRef,
    useCallback,
    useImperativeHandle,
    useLayoutEffect,
    useState,
} from "react";
import getMessage from "../getMessage";
import { IMessageRes } from "@/types/messages";

export interface MessagesListRef {
    prependMessages: (m: IMessageRes[]) => void;
}

interface MessagesListProps {
    currentUserId: number;
    onLoad: VoidFunction;
}

const MessagesList = forwardRef<MessagesListRef, MessagesListProps>(
    ({ currentUserId, onLoad }, ref) => {
        const [messages, setMessages] = useState<IMessageRes[]>([]);

        const prependMessages = useCallback(
            (m: IMessageRes[]) => setMessages((old) => [...m, ...old]),
            []
        );

        useImperativeHandle(
            ref,
            () => ({
                prependMessages,
            }),
            []
        );

        // INFO: use to fetch initial page
        useLayoutEffect(() => {
            onLoad();
        }, []);

        return <>{messages?.map(getMessage(currentUserId))}</>;
    }
);

export default MessagesList;
