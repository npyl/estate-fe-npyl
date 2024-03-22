import {
    Box,
    ListItemIcon,
    ListItemText,
    MenuItem,
    Popover,
    Typography,
} from "@mui/material";
import Image from "next/image";
import PropTypes from "prop-types";
import { FC } from "react";
import { toast } from "react-hot-toast";
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
        icon: "/static/icons/uk_flag.svg",
        label: "English",
    },
    el: {
        icon: "/static/icons/gr_flag.svg",
        label: "Greek",
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

        if (updatesGlobalLanguage)
            i18n.changeLanguage(language).then(() =>
                toast.success(t("Language changed") as string)
            );
    };

    return (
        <Popover
            anchorEl={anchorEl}
            anchorOrigin={{
                horizontal: "center",
                vertical: "bottom",
            }}
            keepMounted
            onClose={onClose}
            open={!!open}
            PaperProps={{ sx: { width: 240 } }}
            transitionDuration={0}
            {...other}
        >
            {(Object.keys(languageOptions) as Language[]).map((language) => (
                <MenuItem onClick={() => handleChange(language)} key={language}>
                    <ListItemIcon>
                        <Box
                            sx={{
                                display: "flex",
                                height: 20,
                                width: 20,
                                "& img": {
                                    width: "100%",
                                    height: "20px",
                                },
                                position: "relative",
                            }}
                        >
                            <Image
                                height={30}
                                width={30}
                                alt={languageOptions[language].label}
                                src={languageOptions[language].icon}
                            />
                        </Box>
                    </ListItemIcon>
                    <ListItemText
                        primary={
                            <Typography variant="subtitle2">
                                {languageOptions[language].label}
                            </Typography>
                        }
                    />
                </MenuItem>
            ))}
        </Popover>
    );
};

LanguagePopover.propTypes = {
    anchorEl: PropTypes.any,
    onClose: PropTypes.func,
    open: PropTypes.bool,
};
