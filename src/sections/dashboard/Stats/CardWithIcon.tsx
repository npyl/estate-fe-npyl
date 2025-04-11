import { Stack, Theme, Tooltip, Typography } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { FC } from "react";
import getBorderColor from "@/theme/borderColor";
import { Home } from "@mui/icons-material";
import { TAnySvg } from "./types";

// -----------------------------------------------------------------------

const getIconBgcolor = ({ palette: { mode, neutral } }: Theme) =>
    mode === "light" ? "#EEF5FF" : neutral?.[800];

interface IconProps {
    Svg: TAnySvg;
}

const Icon: FC<IconProps> = ({ Svg }) => (
    <Stack
        justifyContent="center"
        alignItems="center"
        p={1}
        bgcolor={getIconBgcolor}
        borderRadius="100%"
    >
        <Svg width={20} height={20} />
    </Stack>
);

// -----------------------------------------------------------------------

const getTextColor = ({ palette: { mode, text } }: Theme) =>
    mode === "light" ? "#455468" : text.secondary;

interface CardWithIconProps {
    title: string;
    subtitle: string;
    info?: string;
    Svg?: TAnySvg;
}

const CardWithIcon: FC<CardWithIconProps> = ({
    title,
    subtitle,
    info,
    Svg = Home,
}) => (
    <Stack
        spacing={1}
        border="1px solid"
        borderColor={getBorderColor}
        borderRadius={2}
        bgcolor="background.paper"
        p={3}
        color={getTextColor}
        height={{
            xs: "auto",
            sm: "178px",
        }}
    >
        <Stack direction="row" spacing={1} alignItems="center">
            <Icon Svg={Svg} />
            <Typography variant="h6" overflow="hidden">
                {subtitle}
            </Typography>

            {info ? (
                <Tooltip title={info} placement="top">
                    <InfoOutlinedIcon
                        sx={{
                            cursor: "pointer",
                            color: "rgb(51, 102, 255)",
                            "&:hover": {
                                backgroundColor: "transparent",
                            },
                        }}
                    />
                </Tooltip>
            ) : null}
        </Stack>
        <Stack spacing={1} direction="row" alignItems="center">
            <Typography variant="h3">{title}</Typography>
        </Stack>
    </Stack>
);

export default CardWithIcon;
