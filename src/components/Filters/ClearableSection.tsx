import {
    alpha,
    IconButton,
    Stack,
    StackProps,
    Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import { getBorderColor2 } from "@/theme/borderColor";
import { SpaceBetween } from "../styled";
import { FC } from "react";

// ---------------------------------------------------------------

const StyledIconButton = styled(IconButton)(({ theme }) => ({
    borderRadius: "100%",
    border: "1px solid",
    borderColor: getBorderColor2(theme),

    "& .MuiSvgIcon-root": {
        height: "13px",
        width: "15px",
    },

    "&:hover .MuiSvgIcon-root": {
        color: theme.palette.error.main,
    },
    "&:hover": {
        backgroundColor: alpha(theme.palette.error.main, 0.05),
        borderColor: alpha(theme.palette.error.main, 0.3),
    },
}));

// ---------------------------------------------------------------

interface StyledStackProps extends Omit<StackProps, "divider"> {}

// ---------------------------------------------------------------

export interface ClearableSectionProps extends StyledStackProps {
    title: string;
    ChildrenProps?: StackProps;
    reset?: VoidFunction;
}

const ClearableSection: FC<ClearableSectionProps> = ({
    title,
    reset,
    // ...
    ChildrenProps,
    children,
    ...props
}) => (
    <Stack spacing={1} pb={3} {...props}>
        <SpaceBetween>
            <Typography variant="h6" fontWeight="600">
                {title}
            </Typography>
            <StyledIconButton size="small" onClick={reset}>
                <CloseIcon />
            </StyledIconButton>
        </SpaceBetween>
        <Stack {...ChildrenProps}>{children}</Stack>
    </Stack>
);

export default ClearableSection;
