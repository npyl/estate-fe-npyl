import { SxProps, Theme } from "@mui/material";
import Stack from "@mui/material/Stack";
import Typography, { TypographyProps } from "@mui/material/Typography";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { getBgcolor, getColor } from "./styled";
import Image from "next/image";

// ------------------------------------------------------------------

const getLabel = (p: number) => (p === 0 ? "low" : p === 1 ? "medium" : "high");

const getSx = (p: number): SxProps<Theme> => ({
    backgroundColor: getBgcolor(p),
    color: getColor(p),
    borderRadius: "16px",
    px: 1,
    whiteSpace: "nowrap",
    width: "fit-content",
    height: "fit-content",
});

interface PriorityLabelProps extends TypographyProps {
    priority: number;
}

const PriorityLabel: FC<PriorityLabelProps> = ({ priority, ...props }) => {
    const { t } = useTranslation();
    return (
        <Typography sx={getSx(priority)} {...props}>
            {t(getLabel(priority))}
        </Typography>
    );
};

// ------------------------------------------------------------------------

// INFO: we allow only strings with the prefix data:image
const isValidBase64 = (s: string) => s.startsWith("data:image");

interface Base64ImageProps {
    src: string;
}

const Base64Image = ({ src }: Base64ImageProps) => {
    if (!src || !isValidBase64(src)) {
        return null;
    }

    return (
        <Image
            src={src}
            alt="Attachment"
            width={0}
            height={0}
            objectFit="contain"
            style={{
                width: "100%",
                height: "300px",
                borderRadius: "10px",
            }}
        />
    );
};

// ----------------------------------------------------------------

const EllipsisSx = {
    overflow: "hidden",
    textOverflow: "ellipsis",
};

interface ContentProps {
    name: string;
    priority: number;
    attachments: string[];
}

const Content: FC<ContentProps> = ({ name, priority, attachments }) => {
    const justify = attachments.length === 0 ? "initial" : "space-between";

    return (
        <>
            {attachments.length > 0 ? (
                <Base64Image src={attachments[0]} />
            ) : null}

            <Stack direction="row" spacing={1} justifyContent={justify}>
                <Typography sx={EllipsisSx}>{name}</Typography>
                <PriorityLabel priority={priority} />
            </Stack>
        </>
    );
};

export default Content;
