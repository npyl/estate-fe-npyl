import { Box, ButtonProps, IconButton } from "@mui/material";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import Image from "../image/Image";
import { LanguagePopover } from "./LanguagePopover";
import { Language } from "./types";

const languages: Record<Language, string> = {
    en: "/static/icons/uk_flag.svg",
    gr: "/static/icons/gr_flag.svg",
};

interface LanguageButtonProps extends ButtonProps {
    updatesGlobalLanguage?: boolean;
    onLanguageChange?: (language: Language) => void;
}

export const LanguageButton = ({
    updatesGlobalLanguage = true, // update by default
    onLanguageChange,
    ...props
}: LanguageButtonProps) => {
    const { i18n } = useTranslation();
    const anchorRef = useRef<HTMLButtonElement | null>(null);

    const [language, setLanguage] = useState<Language>("en");
    const [openPopover, setOpenPopover] = useState<boolean>(false);

    const handleOpenPopover = (): void => {
        setOpenPopover(true);
    };

    const handleClosePopover = (): void => {
        setOpenPopover(false);
    };

    const handleChange = (language: Language) => {
        setLanguage(language);
        onLanguageChange?.(language);
    };

    return (
        <>
            <IconButton
                onClick={handleOpenPopover}
                ref={anchorRef}
                sx={{ ml: 1 }}
                {...props}
            >
                <Box
                    sx={{
                        display: "flex",
                        height: 20,
                        width: 20,
                        "& img": {
                            width: "100%",
                        },
                        position: "relative",
                    }}
                >
                    <Image
                        alt=""
                        src={
                            languages[
                                updatesGlobalLanguage
                                    ? (i18n.language as Language)
                                    : language
                            ]
                        }
                    />
                </Box>
            </IconButton>
            <LanguagePopover
                updatesGlobalLanguage={updatesGlobalLanguage}
                anchorEl={anchorRef.current}
                onClose={handleClosePopover}
                onChange={handleChange}
                open={openPopover}
            />
        </>
    );
};
