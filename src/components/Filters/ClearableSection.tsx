import {
    alpha,
    IconButton,
    Stack,
    StackProps,
    Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
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
    reset?: ActionCreatorWithPayload<void, string>;
}

const ClearableSection: FC<ClearableSectionProps> = ({
    title,
    reset,
    children,
    ...props
}) => {
    const dispatch = useDispatch();

    const handleClear = () => reset && dispatch(reset());

    return (
        <Stack spacing={1} pb={2} {...props}>
            <SpaceBetween>
                <Typography variant="h6" fontWeight="600">
                    {title}
                </Typography>
                <StyledIconButton size="small" onClick={handleClear}>
                    <CloseIcon />
                </StyledIconButton>
            </SpaceBetween>
            {children}
        </Stack>
    );
};

export default ClearableSection;
