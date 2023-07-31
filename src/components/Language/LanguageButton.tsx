import { Box, ButtonProps, IconButton } from "@mui/material";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import Image from "../image/Image";
import { LanguagePopover } from "./LanguagePopover";

type Language = "en" | "gr";

const languages: Record<Language, string> = {
    en: "/static/icons/uk_flag.svg",
    gr: "/static/icons/gr_flag.svg",
};

export const LanguageButton = ({ ...props }: ButtonProps) => {
    const anchorRef = useRef<HTMLButtonElement | null>(null);
    const { i18n } = useTranslation();
    const [openPopover, setOpenPopover] = useState<boolean>(false);

    const handleOpenPopover = (): void => {
        setOpenPopover(true);
    };

    const handleClosePopover = (): void => {
        setOpenPopover(false);
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
                    <Image alt="" src={languages[i18n.language as Language]} />
                </Box>
            </IconButton>
            <LanguagePopover
                anchorEl={anchorRef.current}
                onClose={handleClosePopover}
                open={openPopover}
            />
        </>
    );
};
