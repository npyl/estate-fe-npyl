import { IconButton, Stack, StackProps, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { styled } from "@mui/material/styles";
import { getBorderColor2 } from "@/theme/borderColor";
import { SpaceBetween } from "../styled";

interface StyledStackProps extends Omit<StackProps, "divider"> {
    dividers?: boolean;
}

const StyledStack = styled(Stack, {
    shouldForwardProp: (prop) => prop !== "dividers",
})<StyledStackProps>(({ theme, dividers }) => ({
    borderBottom: dividers ? "1px solid" : "none",
    borderBottomColor: getBorderColor2(theme),
}));

interface ClearableDialogContentProps extends StyledStackProps {
    title: string;
    reset?: ActionCreatorWithPayload<void, string>;
}

export const ClearableDialogContent = ({
    title,
    reset,
    dividers = true,
    children,
    ...props
}: ClearableDialogContentProps) => {
    const dispatch = useDispatch();

    const handleClear = () => reset && dispatch(reset());

    return (
        <StyledStack spacing={1} pb={2} dividers={dividers} {...props}>
            <SpaceBetween>
                <Typography>{title}</Typography>
                <IconButton size="small" onClick={handleClear}>
                    <HighlightOffIcon />
                </IconButton>
            </SpaceBetween>
            {children}
        </StyledStack>
    );
};
