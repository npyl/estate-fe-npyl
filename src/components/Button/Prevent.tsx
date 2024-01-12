import { Button, ButtonProps } from "@mui/material";
import { MouseEvent, useCallback } from "react";

interface PreventButtonProps extends ButtonProps {
    prevent?: boolean;
    preventMessage?: string;
}

const PreventButton = ({
    prevent,
    preventMessage,
    children,
    onClick,
    ...props
}: PreventButtonProps) => {
    const handleClick = useCallback(
        (e: MouseEvent<HTMLButtonElement>) => {
            if (prevent) {
                alert(preventMessage);
            } else onClick && onClick(e);
        },
        [prevent, preventMessage, onClick]
    );

    return (
        <Button {...props} onClick={handleClick}>
            {children}
        </Button>
    );
};

export default PreventButton;
