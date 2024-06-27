import { MutableRefObject, useEffect } from "react";

const useClickOutside = (
    ref: MutableRefObject<HTMLElement | null>,
    callback: () => void
): void => {
    const handleClick = (e: MouseEvent): void => {
        if (ref.current && !ref.current.contains(e.target as Node)) {
            callback();
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClick);

        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, [ref, callback]); // Added dependency array to adhere to rules of hooks
};

export default useClickOutside;
