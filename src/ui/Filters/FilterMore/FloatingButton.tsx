import React from "react";
import { Box, Badge, Button, BoxProps } from "@mui/material";
import TuneIcon from "@mui/icons-material/Tune";
import { useTranslation } from "react-i18next";

const getBottom = ({ layout }: any) => layout.createFab.bottom;

interface FloatingButtonProps extends Omit<BoxProps, "onClick"> {
    badgeContent: number;
    onClick: VoidFunction;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({
    badgeContent,
    onClick,
    sx,
    ...props
}) => {
    const { t } = useTranslation();
    return (
        <Box
            position="fixed"
            bottom={getBottom}
            zIndex={2}
            left="50%"
            sx={{
                transform: "translateX(-50%)",
                zIndex: 2,
                ...sx,
            }}
            {...props}
        >
            <Badge variant="dot" badgeContent={badgeContent} color="error">
                <Button
                    onClick={onClick}
                    variant={"contained"}
                    startIcon={<TuneIcon />}
                >
                    {t("Filters")}
                </Button>
            </Badge>
        </Box>
    );
};

export default FloatingButton;
