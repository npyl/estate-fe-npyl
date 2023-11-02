import { useEffect, useRef } from "react";

function useLocalStorageScrollRestore() {
    const observerRef = useRef<ResizeObserver | null>(null);

    useEffect(() => {
        // Create a new ResizeObserver instance
        observerRef.current = new ResizeObserver((entries) => {
            // Callback function to be called when the body's size changes
            // You can trigger your function or logic here
            const savedScrollHeight = localStorage.getItem("scrollHeight");

            // Scroll to the saved position
            if (
                savedScrollHeight &&
                Number(savedScrollHeight) <= entries[0].contentRect.height
            ) {
                window.scrollTo(0, Number(savedScrollHeight));
                localStorage.removeItem("scrollHeight");
            }
        });

        // Start observing the body element
        observerRef.current.observe(document.body);

        // Clean up the observer when the component unmounts
        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, []);

    return observerRef;
}

export default useLocalStorageScrollRestore;
