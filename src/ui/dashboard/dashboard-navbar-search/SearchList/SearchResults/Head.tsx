import { SvgIconComponent } from "@mui/icons-material";
import { SxProps, Theme } from "@mui/material";
import Typography, { TypographyProps } from "@mui/material/Typography";
import {
    forwardRef,
    useCallback,
    useImperativeHandle,
    useRef,
    useState,
} from "react";

const HeadSx: SxProps<Theme> = {
    ".MuiSvgIcon-root": {
        width: "22px",
        height: "22px",
    },
};

interface HeadRef {
    setCount: (c: number) => void;
}

interface HeadProps extends Omit<TypographyProps, "children"> {
    Icon: SvgIconComponent;
    children: string;
}

const Head = forwardRef<HeadRef, HeadProps>(
    ({ Icon, sx, children, ...props }, ref) => {
        const [count, setCount] = useState(0);

        useImperativeHandle(ref, () => ({ setCount }), []);

        const content = count > 0 ? `${children} (${count})` : children;

        return (
            <Typography
                variant="h6"
                display="flex"
                justifyContent="center"
                gap={1}
                alignItems="center"
                width="100%"
                p={1}
                // ...
                position="sticky"
                top={0}
                bottom={0}
                bgcolor="background.default"
                color="text.secondary"
                zIndex={1}
                boxShadow={1}
                // ...
                sx={{ ...HeadSx, ...(sx as any) }}
                // ...
                {...props}
            >
                <Icon />
                {content}
            </Typography>
        );
    }
);

const useHeadControl = () => {
    const headRef = useRef<HeadRef>(null);
    const onCountChange = useCallback(
        (c: number) => headRef.current?.setCount(c),
        []
    );
    return { headRef, onCountChange };
};

export { useHeadControl };
export default Head;
