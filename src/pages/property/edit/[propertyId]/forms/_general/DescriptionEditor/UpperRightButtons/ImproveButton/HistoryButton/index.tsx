import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import Button, { ButtonProps } from "@mui/material/Button";
import { EditorState } from "draft-js";
import useHistory from "./useHistory";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import { SxProps, Theme } from "@mui/material";
import React from "react";

const ButtonSx: SxProps<Theme> = {
    display: "none",
};

export interface HistoryButtonRef {
    push: (s: EditorState) => void;
    initialise: (s: EditorState) => void;
    getSize: () => number;
}

/**
 * onRevert: can revert back and forth
 */
interface HistoryButtonProps extends Omit<ButtonProps, "onClick"> {
    onRevert: (s: EditorState) => void;
    onPastChange: (b: boolean) => void;
}

const HistoryButton = forwardRef<HistoryButtonRef, HistoryButtonProps>(
    ({ onPastChange, onRevert, sx, ...props }, ref) => {
        const buttonUndoRef = useRef<HTMLButtonElement>(null);
        const buttonRedoRef = useRef<HTMLButtonElement>(null);

        const { initialise, push, previous, next, getSize } =
            useHistory<EditorState>(buttonUndoRef, buttonRedoRef);

        useImperativeHandle(
            ref,
            () => ({
                push,
                initialise,
                getSize,
            }),
            []
        );

        const handlePrevious = useCallback(() => {
            const current = previous(onPastChange);
            if (!current) return;
            onRevert(current);
        }, [onRevert]);
        const handleNext = useCallback(() => {
            const current = next(onPastChange);
            if (!current) return;
            onRevert(current);
        }, [onRevert]);

        return (
            <>
                <Button
                    ref={buttonUndoRef}
                    onClick={handlePrevious}
                    sx={{ ...ButtonSx, ...sx }}
                    color="info"
                    variant="contained"
                    {...props}
                >
                    <UndoIcon />
                </Button>

                <Button
                    ref={buttonRedoRef}
                    onClick={handleNext}
                    sx={{ ...ButtonSx, ...sx }}
                    color="info"
                    variant="contained"
                    {...props}
                >
                    <RedoIcon />
                </Button>
            </>
        );
    }
);

export default React.memo(HistoryButton);
