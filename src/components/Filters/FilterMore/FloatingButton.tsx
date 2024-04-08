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
            sx={{
                borderRadius: "24px",
                position: "fixed",
                bottom: "2%",
                zIndex: 2,
                left: 0,
                right: 0,
                margin: "auto",
                width: "90px",
                marginBottom: 2,
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
