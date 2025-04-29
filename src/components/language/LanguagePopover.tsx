import { ListItemText, MenuItem, Popover, Typography } from "@mui/material";
import type { FC } from "react";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { t } from "i18next";
import { Language, LanguageOptions } from "../LanguageButton/types";

interface LanguagePopoverProps {
    updatesGlobalLanguage: boolean;
    anchorEl: null | Element;
    onClose?: () => void;
    onChange?: (language: Language) => void;
    open?: boolean;
}

const languageOptions: LanguageOptions = {
    en: {
        label: t("English"),
        description: t("United States"),
    },
    el: {
        label: t("Greek"),
        description: t("Modern Greek"),
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

        if (updatesGlobalLanguage) {
            i18n.changeLanguage(language);
        }
    };

    return (
        <Popover
            anchorEl={anchorEl}
            anchorOrigin={{
                horizontal: "left",
                vertical: "bottom",
            }}
            transformOrigin={{
                horizontal: "center", // Moves the popover slightly to the left
                vertical: "top",
            }}
            keepMounted
            onClose={onClose}
            open={!!open}
            PaperProps={{
                sx: { minWidth: 140, paddingInline: 0.5, borderRadius: "12px" },
            }}
            transitionDuration={500}
            {...other}
            // disableScrollLock
        >
            {(Object.keys(languageOptions) as Language[]).map((language) => (
                <MenuItem
                    onClick={() => handleChange(language)}
                    key={language}
                    sx={{
                        backgroundColor:
                            i18n.language === language
                                ? "rgba(0, 0, 0, 0.09)"
                                : "transparent",
                        borderRadius: "12px",
                        my: 0.5,
                        pb: 1.3,
                        "&:hover": {
                            backgroundColor: "rgba(0, 0, 0, 0.04)",
                            borderRadius: "12px",
                        },
                    }}
                >
                    <ListItemText
                        primary={
                            <Typography
                                variant="subtitle1"
                                sx={{ lineHeight: 1.2 }}
                            >
                                {t(languageOptions[language].label)}
                            </Typography>
                        }
                        secondary={
                            <Typography
                                variant="subtitle2"
                                color="text.secondary"
                                sx={{ lineHeight: 1, marginTop: 0.5 }}
                            >
                                {t(
                                    languageOptions[language]?.description || ""
                                )}
                            </Typography>
                        }
                    />
                </MenuItem>
            ))}
        </Popover>
    );
};
