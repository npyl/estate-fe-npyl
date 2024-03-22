import { ButtonProps, IconButton } from "@mui/material";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import Image from "../image/Image";
import { LanguagePopover } from "./LanguagePopover";
import { Language } from "./types";

const languages: Record<Language, string> = {
    en: "/static/icons/uk_flag.svg",
    el: "/static/icons/gr_flag.svg",
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

    const handleOpenPopover = (): void => setOpenPopover(true);
    const handleClosePopover = (): void => setOpenPopover(false);

    const handleChange = (language: Language) => {
        setLanguage(language);
        onLanguageChange?.(language);
    };

    const imageSrc = useMemo(
        () =>
            languages[
                updatesGlobalLanguage ? (i18n.language as Language) : language
            ],
        [updatesGlobalLanguage, i18n.language, language]
    );

    useEffect(() => {
        const savedLanguage = localStorage.getItem("language");
        if (savedLanguage) {
            setLanguage(savedLanguage as Language);
            i18n.changeLanguage(savedLanguage);
        }
    }, [i18n]);

    return (
        <>
            <IconButton
                onClick={handleOpenPopover}
                ref={anchorRef}
                sx={{ ml: 1 }}
                {...props}
            >
                <Image alt="" src={imageSrc} width={20} height={20} />
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
