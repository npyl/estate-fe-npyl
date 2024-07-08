// FloatingButton.tsx
import React from "react";
import { Box, Badge, Button } from "@mui/material";
import TuneIcon from "@mui/icons-material/Tune";
import { useTranslation } from "react-i18next";

interface FloatingButtonProps {
    badgeContent: number;
    onClick: VoidFunction;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({
    badgeContent,
    onClick,
}) => {
    const { t } = useTranslation();
    return (
        <Box
            position="fixed"
            bottom={30}
            zIndex={2}
            left="50%"
            sx={{
                transform: "translateX(-50%)",
                zIndex: 2,
            }}
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
