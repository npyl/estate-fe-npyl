import { RefObject, useLayoutEffect } from "react";

const useAvailableHeight = (targetRef: RefObject<HTMLDivElement>) => {
    useLayoutEffect(() => {
        const boardElement = targetRef.current;
        if (!boardElement) return;

        const boardTop = boardElement.getBoundingClientRect().top;
        const buffer = 16;
        const availableHeight = window.innerHeight - boardTop - buffer;
        const newHeight = `${availableHeight}px`;

        targetRef.current.style.height = newHeight;
    }, []);
};

export default useAvailableHeight;
