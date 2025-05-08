import { usePagination } from "@/components/Pagination";
import {
    Dispatch,
    SetStateAction,
    useCallback,
    useLayoutEffect,
    useRef,
} from "react";

const FIRST_PAGE_TOKEN = "";

const useGmailPagination = (
    nextPageToken: string | null | undefined,
    setPageToken: Dispatch<SetStateAction<string>>
) => {
    const pageTokens = useRef<string[]>([FIRST_PAGE_TOKEN]);
    useLayoutEffect(() => {
        // reached end; no change
        const old = pageTokens.current;
        if (!nextPageToken) return;

        // append one more page
        pageTokens.current = [...old, nextPageToken];
    }, [nextPageToken]);

    const onChange = useCallback((p: number) => {
        // reset to 1st page
        if (p === 0) {
            setPageToken(FIRST_PAGE_TOKEN);
            return;
        }

        const token = pageTokens.current.at(p);
        if (!token) return;

        setPageToken(token);
    }, []);
    const pagination = usePagination(onChange);

    return pagination;
};

export { FIRST_PAGE_TOKEN };
export default useGmailPagination;
