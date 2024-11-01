import { SxProps, Theme } from "@mui/material";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { getBgcolor, getColor } from "./styled";

// ---------------------------------------------------------------------

const getLabel = (p: number) => (p === 0 ? "low" : p === 1 ? "medium" : "high");

const getSx = (p: number): SxProps<Theme> => ({
    backgroundColor: getBgcolor(p),
    color: getColor(p),

    borderRadius: "16px",

    px: 1,
});

interface PriorityLabelProps {
    priority: number;
}

const PriorityLabel: FC<PriorityLabelProps> = ({ priority }) => {
    const { t } = useTranslation();
    return (
        <Typography sx={getSx(priority)}>{t(getLabel(priority))}</Typography>
    );
};

// ---------------------------------------------------------------------

interface ContentProps {
    name: string;
    priority: number;
    attachments: string[];
}

const Content: FC<ContentProps> = ({ name, priority, attachments }) => {
    const justify = attachments.length === 0 ? "initial" : "space-between";

    return (
        <>
            <Stack direction="row" spacing={1} justifyContent={justify}>
                <Typography>{name}</Typography>
                <PriorityLabel priority={priority} />
            </Stack>
        </>
    );
};

export default Content;
