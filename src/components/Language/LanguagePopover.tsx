import { MenuItem, Popover, Typography, List } from "@mui/material";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Language, LanguageOptions } from "./types";

interface LanguagePopoverProps {
    updatesGlobalLanguage: boolean;
    anchorEl: null | Element;
    onClose?: () => void;
    onChange?: (language: Language) => void;
    open?: boolean;
}

const languageOptions: LanguageOptions = {
    en: {
        label: "English",
        description: "United States",
    },
    el: {
        label: "Greek",
        description: "Modern Greek",
    },
};

export const LanguagePopover: FC<LanguagePopoverProps> = (props) => {
    const {
        updatesGlobalLanguage,
        anchorEl,
        onClose,
        onChange,
        open,
        ...other
    } = props;
    const { i18n, t } = useTranslation();

    const handleChange = async (language: Language): Promise<void> => {
        onClose?.();
        onChange?.(language);
        localStorage.setItem("language", language);

        if (updatesGlobalLanguage) i18n.changeLanguage(language);
    };

    const currentLanguage = updatesGlobalLanguage
        ? i18n.language
        : (i18n.language as Language);

    return (
        <Popover
            anchorEl={anchorEl}
            anchorOrigin={{
                horizontal: "right",
                vertical: "bottom",
            }}
            transformOrigin={{
                horizontal: "right",
                vertical: "top",
            }}
            disableScrollLock={true} // disable scroll lock
            keepMounted
            onClose={onClose}
            open={!!open}
            PaperProps={{
                sx: {
                    width: 180,
                    borderRadius: 2,
                    paddingInline: 0.9,
                    transition: "opacity 0.95s ease, transform 0.3s ease",
                    opacity: open ? 1 : 0,
                    transform: open ? "scale(1)" : "scale(0.95)",
                },
            }}
            transitionDuration={1200}
            {...other}
        >
            <List sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {(Object.keys(languageOptions) as Language[]).map(
                    (language) => (
                        <MenuItem
                            onClick={() => handleChange(language)}
                            key={language}
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                py: 0.4,
                                borderRadius: 1,
                                backgroundColor:
                                    currentLanguage === language
                                        ? "rgba(0, 0, 0, 0.07)"
                                        : "transparent",
                                "&:hover": {
                                    backgroundColor: "rgba(0, 0, 0, 0.04)",
                                },
                            }}
                        >
                            <Typography
                                variant="body1"
                                sx={{ color: "neutral.500" }}
                                fontWeight={"600"}
                            >
                                {t(languageOptions[language].label)}
                            </Typography>
                            <Typography
                                fontSize="small"
                                sx={{ color: "neutral.400" }}
                            >
                                {t(languageOptions[language].description || "")}
                            </Typography>
                        </MenuItem>
                    )
                )}
            </List>
        </Popover>
    );
};
