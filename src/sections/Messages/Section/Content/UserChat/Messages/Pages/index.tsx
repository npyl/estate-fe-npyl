import {
    IConversationMessagesReq,
    IConversationMessagesRes,
    useLazyGetConversationMessagesQuery,
} from "@/services/messages";
import { FC, useCallback, useRef } from "react";
import PageTriggerController, {
    PageTriggerControllerRef,
} from "./PageTriggerController";
import MessagesList, { MessagesListRef } from "./MessagesList";
import RealTimeMessages from "./RealTime";
import {
    IRealtimeMessage,
    RealtimeMessageToMessageRes,
} from "@/types/messages";

// -------------------------------------------------------------------

const PAGE_SIZE = 15;

interface MessagesPagesProps {
    conversationId: string;
}

const Pages: FC<MessagesPagesProps> = ({ conversationId }) => {
    const cursor = useRef<string | null>(null);

    const pageTriggerRef = useRef<PageTriggerControllerRef>(null);
    const messagesListRef = useRef<MessagesListRef>(null);

    const [getPage] = useLazyGetConversationMessagesQuery();

    const onPage = useCallback((res: IConversationMessagesRes | null) => {
        if (!res) return;

        const { hasMore, messages } = res;

        const id = messages?.at(0)?.id;
        if (!id) return;
        cursor.current = id;

        pageTriggerRef.current?.setHasMore(hasMore);
        messagesListRef.current?.prependMessages(messages);
    }, []);

    const getNextPage = useCallback(async () => {
        try {
            const body: IConversationMessagesReq = {
                conversationId,
                pagination: {
                    page: 0,
                    cursor: cursor.current,
                    size: PAGE_SIZE,
                },
            };

            const res = await getPage(body).unwrap();
            if (!res) throw new Error("");

            return res;
        } catch (ex) {
            return null;
        }
    }, [conversationId]);

    const loadNextPage = () => getNextPage().then(onPage);

    const loadFirstPage = async () => {
        cursor.current = null;
        messagesListRef.current?.clearMessages();
        await loadNextPage();
    };

    // -------------------------------------------------------------------

    const handleRealTimeMessage = useCallback((m: IRealtimeMessage) => {
        messagesListRef.current?.appendMessage(RealtimeMessageToMessageRes(m));
    }, []);

    return (
        <>
            <PageTriggerController
                ref={pageTriggerRef}
                onScrollReach={loadNextPage}
            />

            <MessagesList
                ref={messagesListRef}
                conversationId={conversationId}
                onLoad={loadFirstPage}
            />

            <RealTimeMessages onMessage={handleRealTimeMessage} />
        </>
    );
};

export default Pages;
