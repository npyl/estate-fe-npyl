import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import {
    FC,
    useRef,
    useState,
    useLayoutEffect,
    useCallback,
    RefObject,
} from "react";

const useIsEllipsis = (elementRef: RefObject<HTMLElement>) => {
    const [isEllipsis, setIsOverflown] = useState(false);

    const checkOverflow = useCallback(() => {
        const element = elementRef.current;
        if (!element) return;
        setIsOverflown(element.scrollWidth > element.clientWidth);
    }, []);

    useLayoutEffect(() => {
        // Initial check
        checkOverflow();

        // Re-check on window resize
        window.addEventListener("resize", checkOverflow);

        return () => {
            window.removeEventListener("resize", checkOverflow);
        };
    }, []);

    return isEllipsis;
};

const EllipsisSx = {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
};

interface ContentProps {
    name: string;
}

const Content: FC<ContentProps> = ({ name }) => {
    const textRef = useRef<HTMLElement>(null);

    const isEllipsis = useIsEllipsis(textRef);

    const content = (
        <Typography ref={textRef} sx={EllipsisSx} variant="body2">
            {name}
        </Typography>
    );

    if (isEllipsis)
        return (
            <Tooltip title={name} placement="top">
                {content}
            </Tooltip>
        );

    return content;
};

export default Content;
