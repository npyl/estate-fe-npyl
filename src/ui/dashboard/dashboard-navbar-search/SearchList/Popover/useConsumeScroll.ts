import { useLayoutEffect } from "react";

const useConsumeScroll = () => {
    useLayoutEffect(() => {
        document.body.style.overflowY = "hidden";
        return () => {
            document.body.style.overflowY = "auto";
        };
    }, []);
};

export default useConsumeScroll;
