import {
    IConversationMessagesReq,
    IConversationMessagesRes,
    useLazyGetConversationMessagesQuery,
} from "@/services/messages";
import { FC, useCallback, useLayoutEffect, useRef, useState } from "react";
import getMessage from "../getMessage";
import PageTrigger from "./PageTrigger";
import { IMessageRes } from "@/types/messages";

const PAGE_SIZE = 15;

interface MessagesPagesProps {
    currentUserId: number;
    conversationId: string;
}

const Pages: FC<MessagesPagesProps> = ({ currentUserId, conversationId }) => {
    const page = useRef(0);

    const [getPage] = useLazyGetConversationMessagesQuery();
    const [hasMore, setHasMore] = useState(false);
    const [messages, setMessages] = useState<IMessageRes[]>([]);

    const onPage = useCallback((res: IConversationMessagesRes | null) => {
        if (!res) return;

        const { hasMore, messages } = res;

        setHasMore(hasMore);

        setMessages((old) => [...messages, ...old]);
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

    // INFO: initial page
    useLayoutEffect(() => {
        loadNextPage();
    }, [loadNextPage]);

    return (
        <>
            {hasMore ? <PageTrigger onScrollReach={loadNextPage} /> : null}
            {messages?.map(getMessage(currentUserId))}
        </>
    );
};

export default Pages;
