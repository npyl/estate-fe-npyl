import { IconButton, Stack, StackProps } from "@mui/material";
import { useDispatch } from "react-redux";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

interface ClearableDialogContentProps extends StackProps {
    dividers?: boolean;
    reset?: ActionCreatorWithPayload<void, string>;
}

export const ClearableDialogContent = ({
    dividers,
    reset,
    children,
    ...props
}: ClearableDialogContentProps) => {
    const dispatch = useDispatch();

    return (
        <Stack
            direction="row"
            spacing={1}
            borderBottom={dividers ? "1px solid #ddd" : undefined}
            py={2}
            {...props}
        >
            <Stack flex={1}>{children}</Stack>
            <IconButton size="small" onClick={() => reset && dispatch(reset())}>
                <HighlightOffIcon />
            </IconButton>
        </Stack>
    );
};
