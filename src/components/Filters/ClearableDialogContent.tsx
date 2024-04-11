import { IconButton, Stack, StackProps } from "@mui/material";
import { useDispatch } from "react-redux";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { styled } from "@mui/material/styles";
import { getBorderColor2 } from "@/theme/borderColor";
import useResponsive from "@/hooks/useResponsive";

const StyledStack = styled(Stack)<StackProps & { belowSm: boolean }>(
    ({ theme, belowSm }) => ({
        borderBottom: "1px solid",
        borderBottomColor: getBorderColor2(theme),

        position: belowSm ? "relative" : "initial",
    })
);

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

    const belowSm = useResponsive("down", "sm");

    return (
        <StyledStack
            direction="row"
            spacing={1}
            py={2}
            belowSm={belowSm}
            {...props}
        >
            <Stack flex={1}>{children}</Stack>
            <IconButton
                size="small"
                sx={{
                    position: belowSm ? "absolute" : "initial",
                    top: 2,
                    right: 2,
                }}
                onClick={() => reset && dispatch(reset())}
            >
                <HighlightOffIcon />
            </IconButton>
        </StyledStack>
    );
};
