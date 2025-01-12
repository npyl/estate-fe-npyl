import {
    Dispatch,
    forwardRef,
    SetStateAction,
    useImperativeHandle,
    useState,
} from "react";
import PageTrigger, { PageTriggerProps } from "./PageTrigger";

export interface PageTriggerControllerRef {
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

export default PageTriggerController;
