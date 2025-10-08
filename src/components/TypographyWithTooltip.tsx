import Typography, { TypographyProps } from "@mui/material/Typography";
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
    const [isEllipsis, setIsEllipsis] = useState(false);

    const checkOverflow = useCallback(() => {
        const element = elementRef.current;
        if (!element) return;
        setIsEllipsis(element.scrollWidth > element.clientWidth);
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

interface TypographyWithTooltipProps extends Omit<TypographyProps, "children"> {
    children: string;
}

const TypographyWithTooltip: FC<TypographyWithTooltipProps> = (props) => {
    const textRef = useRef<HTMLElement>(null);

    const isEllipsis = useIsEllipsis(textRef);

    const content = <Typography ref={textRef} sx={EllipsisSx} {...props} />;

    if (isEllipsis)
        return (
            <Tooltip title={props.children} placement="top">
                {content}
            </Tooltip>
        );

    return content;
};

export default TypographyWithTooltip;
