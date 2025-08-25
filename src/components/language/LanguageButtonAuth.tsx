import { ButtonProps, Box, Typography, useTheme } from "@mui/material";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"; // Icon for dropdown arrow
import { Language } from "../LanguageButton/types";
import { LanguagePopover } from "./LanguagePopover";

interface LanguageButtonAuthProps extends ButtonProps {
    updatesGlobalLanguage?: boolean;
    onLanguageChange?: (language: Language) => void;
}

export const LanguageButtonAuth = ({
    updatesGlobalLanguage = true, // update by default
    onLanguageChange,
    ...props
}: LanguageButtonAuthProps) => {
    const { i18n } = useTranslation();
    const theme = useTheme();
    const anchorRef = useRef<HTMLButtonElement | null>(null);

    const [openPopover, setOpenPopover] = useState<boolean>(false);

    const handleOpenPopover = (): void => setOpenPopover(true);
    const handleClosePopover = (): void => setOpenPopover(false);

    const handleChange = (language: Language) => {
        if (updatesGlobalLanguage) {
            i18n.changeLanguage(language); // switch language
            localStorage.setItem("lang", language); // persist it
        }
        onLanguageChange?.(language);
    };

    return (
        <>
            <Box
                ref={anchorRef}
                onClick={handleOpenPopover}
                sx={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                    fontSize: "small",
                    p: 1,
                    ml: 0.5,
                    backgroundColor: "rgba(0, 0, 0, 0.15)",
                    "& svg, & p": {
                        color: "white",
                    },
                    borderRadius: 2, // Slight rounding for a soft look
                    "&:hover": {
                        backgroundColor: "rgba(0, 0, 0, 0.14)",
                        "& svg, & p": {
                            color: "white",
                        },
                    },

                    ...props.sx,
                }}
            >
                <LanguageOutlinedIcon
                    sx={{
                        mr: 0.5,
                        color:
                            theme.palette.mode === "light"
                                ? "neutral.600"
                                : "neutral.500",
                        fontSize: "large",
                    }}
                />
                <Typography
                    variant="body2"
                    fontSize={"small"}
                    sx={{
                        mr: 0.5,
                        color:
                            theme.palette.mode === "light"
                                ? "neutral.600"
                                : "neutral.500",
                    }}
                >
                    {i18n.language.toUpperCase() === "EL"
                        ? "ΕΛ"
                        : i18n.language.toUpperCase()}
                </Typography>
                <ArrowDropDownIcon
                    sx={{ fontSize: "medium", color: "neutral.600" }}
                />
            </Box>
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
