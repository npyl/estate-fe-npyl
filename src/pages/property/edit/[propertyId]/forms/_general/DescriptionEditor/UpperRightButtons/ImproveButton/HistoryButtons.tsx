import { FC, forwardRef, useImperativeHandle, useRef } from "react";
import HistoryIcon from "@mui/icons-material/History";
import Button, { ButtonProps } from "@mui/material/Button";
import { EditorState } from "draft-js";

interface HistoryButtonRef extends HTMLButtonElement {
    push: (s: EditorState) => void;
}
interface HistoryButtonProps extends ButtonProps {}

const HistoryButton: FC<HistoryButtonProps> = forwardRef<
    HistoryButtonRef,
    HistoryButtonProps
>((props, ref) => {
    const buttonRef = useRef<HTMLButtonElement>(null);

    useImperativeHandle(
        ref,
        {
            ...buttonRef.current,
        },
        [buttonRef.current]
    );

    return (
        <Button ref={buttonRef} {...props}>
            <HistoryIcon />
        </Button>
    );
});

export default HistoryButton;
