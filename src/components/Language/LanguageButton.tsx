import { Box, ButtonProps, IconButton } from "@mui/material";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import Image from "../image/Image";
import { LanguagePopover } from "./LanguagePopover";
import { Language } from "./types";
import useDialog from "@/hooks/useDialog";

const languages: Record<Language, string> = {
    en: "/static/icons/uk_flag.svg",
    el: "/static/icons/gr_flag.svg",
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
    ...props
}: LanguageButtonProps) => {
    const { i18n } = useTranslation();
    const anchorRef = useRef<HTMLButtonElement | null>(null);

    const [isPopoverOpen, openPopover, closePopover] = useDialog();

    const imageSrc =
        languages[
            updatesGlobalLanguage ? (i18n.language as Language) : language
        ];

    return (
        <>
            <IconButton
                onClick={openPopover}
                ref={anchorRef}
                {...props}
                sx={{
                    padding: 0,
                    "&:hover": {
                        backgroundColor: "transparent",
                    },
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 28,
                        height: 20,
                    }}
                >
                    <Image alt="" src={imageSrc} width={18} height={18} />
                </Box>
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
