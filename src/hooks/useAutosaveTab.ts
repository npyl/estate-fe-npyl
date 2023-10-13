import { MutableRefObject, useEffect, useRef } from "react";
import { useSelector } from "react-redux";

export const useAutosaveTab = (
    selector: any,
    callback: (bodyRef: MutableRefObject<typeof selector>) => void
) => {
    const body = useSelector(selector);
    const bodyRef = useRef(body);

    useEffect(() => {
        bodyRef.current = body;
    }, [body]);

    useEffect(() => {
        return () => {
            callback(bodyRef);
        };
    }, []);
};
