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
import { IMessageRes } from "@/types/messages";

// -------------------------------------------------------------------

const PAGE_SIZE = 15;

interface MessagesPagesProps {
    currentUserId: number;
    conversationId: string;
}

const Pages: FC<MessagesPagesProps> = ({ currentUserId, conversationId }) => {
    const page = useRef(0);

    const pageTriggerRef = useRef<PageTriggerControllerRef>(null);
    const messagesListRef = useRef<MessagesListRef>(null);

    const [getPage] = useLazyGetConversationMessagesQuery();

    const onPage = useCallback((res: IConversationMessagesRes | null) => {
        if (!res) return;

        const { hasMore, messages } = res;

        pageTriggerRef.current?.setHasMore(hasMore);
        messagesListRef.current?.prependMessages(messages);
    }, []);

    const getNextPage = useCallback(async () => {
        try {
            const body: IConversationMessagesReq = {
                conversationId,
                pagination: { page: page.current, size: PAGE_SIZE },
            };

            const res = await getPage(body).unwrap();
            if (!res) throw new Error("");

            // INFO: make sure we increment the page ONLY! if the request suceeds
            page.current += 1;

            return res;
        } catch (ex) {
            return null;
        }
    }, [conversationId]);

    const loadNextPage = useCallback(
        () => getNextPage().then(onPage),
        [getNextPage]
    );

    // -------------------------------------------------------------------

    const handleRealTimeMessage = useCallback((m: IMessageRes) => {
        const count = messagesListRef.current?.getMessagesCount() ?? 0;
        const hasMore = (count + 1) % PAGE_SIZE > 0;

        console.log("hasMore: ", hasMore, "count: ", count);

        pageTriggerRef.current?.setHasMore(hasMore);
        messagesListRef.current?.appendMessage(m);
    }, []);

    return (
        <>
            <PageTriggerController
                ref={pageTriggerRef}
                onScrollReach={loadNextPage}
            />

            <MessagesList
                ref={messagesListRef}
                currentUserId={currentUserId}
                onLoad={loadNextPage}
            />

            <RealTimeMessages onMessage={handleRealTimeMessage} />
        </>
    );
};

export default Pages;
