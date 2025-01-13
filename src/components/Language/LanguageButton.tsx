import {
    ButtonProps,
    IconButton,
    SxProps,
    Theme,
    Typography,
} from "@mui/material";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { Language } from "./types";
import useDialog from "@/hooks/useDialog";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LanguageImage from "./languageImage";
import dynamic from "next/dynamic";
const LanguagePopover = dynamic(() => import("./LanguagePopover"));

const IconButtonSx: SxProps<Theme> = {
    padding: 0,
    color: "neutral.500",
    "&:hover": {
        backgroundColor: "transparent",
        color: "neutral.600",
    },

    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 0.5,
    width: 60,
    height: 20,
};

interface LanguageButtonProps extends ButtonProps {
    onLanguageChange?: (language: Language) => void;
    // ...
    updatesGlobalLanguage?: boolean;
    language?: Language;
}

export const LanguageButton = ({
    updatesGlobalLanguage = true, // update by default
    language = "el",
    onLanguageChange,
    sx,
    ...props
}: LanguageButtonProps) => {
    const { i18n } = useTranslation();

    const anchorRef = useRef<HTMLButtonElement | null>(null);
    const [isPopoverOpen, openPopover, closePopover] = useDialog();

    const currentLanguage = updatesGlobalLanguage ? i18n.language : language;
    const languageAbbreviation = currentLanguage === "en" ? "EN" : "GR";

    return (
        <>
            <IconButton
                ref={anchorRef}
                onClick={openPopover}
                sx={{ ...IconButtonSx, ...sx }}
                {...props}
            >
                <LanguageImage />

                <Typography sx={{ color: "inherit", fontSize: "small" }}>
                    {languageAbbreviation}
                </Typography>

                {isPopoverOpen ? (
                    <KeyboardArrowUpIcon
                        sx={{ color: "inherit", width: 17, height: 17 }}
                    />
                ) : (
                    <KeyboardArrowDownIcon
                        sx={{ color: "inherit", width: 17, height: 17 }}
                    />
                )}
            </IconButton>

            {isPopoverOpen ? (
                <LanguagePopover
                    updatesGlobalLanguage={updatesGlobalLanguage}
                    anchorEl={anchorRef.current}
                    onClose={closePopover}
                    onChange={onLanguageChange}
                    open={isPopoverOpen}
                />
            ) : null}
        </>
    );
};
