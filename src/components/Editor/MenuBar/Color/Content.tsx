import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import Grid from "@mui/material/Grid";
import { BACKGROUND_COLORS, TEXT_COLORS } from "./constants";
import { FC, useCallback } from "react";
import { IColor } from "./types";
import { SxProps, Theme } from "@mui/material";
import { useEditorContext } from "../../context";
import { getBorderColor2 } from "@/theme/borderColor";

// ------------------------------------------------------------------

const ItemSx: SxProps<Theme> = {
    cursor: "pointer",

    opacity: 1,

    "&:hover": {
        opacity: 0.8,
    },
};

const getBorderColor = (text: boolean, active: boolean, color: string) => {
    if (text) {
        if (color === "inherit") return "transparent";
        if (active) return "black";
        return color;
    } else {
        if (color === "transparent") return getBorderColor2;
        if (active) return "black";
        return color;
    }
};

interface OptionProps {
    text?: boolean;
    color: string;
}

const ColorOption: FC<OptionProps> = ({ text = false, color }) => {
    const { editor } = useEditorContext();

    const active = Boolean(
        text
            ? editor?.isActive("textStyle", { color })
            : editor?.isActive("highlight", { color })
    );

    const borderColor = getBorderColor(text, active, color);
    const bgcolor = text ? "transparent" : color;

    const onClick = useCallback(() => {
        if (!editor) return;

        if (text && color === "transparent") {
            // clear
            editor.commands.unsetColor();
        } else if (text) {
            // text color
            editor.commands.setColor(color);
        } else if (color === "transparent") {
            // clear
            editor.commands.unsetHighlight();
        } else {
            // background color
            editor.commands.setHighlight({ color });
        }
    }, [text, color]);

    return (
        <Grid
            item
            xs={2}
            // ...
            height={28}
            alignItems="center"
            justifyContent="center"
            // ...
            border="1px solid"
            borderColor={borderColor}
            borderRadius={1.5}
            bgcolor={bgcolor}
            // ...
            sx={ItemSx}
            onClick={onClick}
        >
            {text ? (
                <Typography
                    variant="body1"
                    fontWeight="500"
                    sx={{ color }}
                    textAlign="center"
                >
                    A
                </Typography>
            ) : null}
        </Grid>
    );
};

// ------------------------------------------------------------------

const getTextColor = ({ key, color }: IColor) => (
    <ColorOption text key={key} color={color} />
);

const getBgColor = ({ key, color }: IColor) => (
    <ColorOption key={key} color={color} />
);

// ------------------------------------------------------------------

const TextOptions = () => (
    <Grid container gap={1}>
        {TEXT_COLORS.map(getTextColor)}
    </Grid>
);

const BackgroundOptions = () => (
    <Grid container gap={1}>
        {BACKGROUND_COLORS.map(getBgColor)}
    </Grid>
);

// ------------------------------------------------------------------

const Content = () => {
    const { t } = useTranslation();

    return (
        <Stack p={1} spacing={2}>
            <Stack spacing={1}>
                <Typography variant="body1">{t("Text")}</Typography>
                <TextOptions />
            </Stack>
            <Stack spacing={1}>
                <Typography variant="body1">{t("Background")}</Typography>
                <BackgroundOptions />
            </Stack>
        </Stack>
    );
};

export default Content;
