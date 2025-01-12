import {
    IConversationMessagesReq,
    IConversationMessagesRes,
    useLazyGetConversationMessagesQuery,
} from "@/services/messages";
import {
    Dispatch,
    FC,
    forwardRef,
    SetStateAction,
    useCallback,
    useImperativeHandle,
    useLayoutEffect,
    useRef,
    useState,
} from "react";
import getMessage from "../getMessage";
import PageTrigger, { PageTriggerProps } from "./PageTrigger";
import { IMessageRes } from "@/types/messages";

// -------------------------------------------------------------------

interface PageTriggerControllerRef {
    setHasMore: Dispatch<SetStateAction<boolean>>;
}

const PageTriggerController = forwardRef<
    PageTriggerControllerRef,
    PageTriggerProps
>((props, ref) => {
    const [hasMore, setHasMore] = useState(false);

    useImperativeHandle(
        ref,
        () => ({
            setHasMore,
        }),
        []
    );

    if (!hasMore) return null;

    return <PageTrigger {...props} />;
});

// -------------------------------------------------------------------

const PAGE_SIZE = 15;

interface MessagesPagesProps {
    currentUserId: number;
    conversationId: string;
}

const Pages: FC<MessagesPagesProps> = ({ currentUserId, conversationId }) => {
    const page = useRef(0);

    const pageTriggerRef = useRef<PageTriggerControllerRef>(null);

    const [getPage] = useLazyGetConversationMessagesQuery();
    const [messages, setMessages] = useState<IMessageRes[]>([]);

    const onPage = useCallback((res: IConversationMessagesRes | null) => {
        if (!res) return;

        const { hasMore, messages } = res;

        pageTriggerRef.current?.setHasMore(hasMore);

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
            <PageTriggerController
                ref={pageTriggerRef}
                onScrollReach={loadNextPage}
            />

            {messages?.map(getMessage(currentUserId))}
        </>
    );
};

export default Pages;
