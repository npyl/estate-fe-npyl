import Editor from "@/components/Editor";
import { SxProps, Theme } from "@mui/material";
import { FC } from "react";

// ---------------------------------------------------------------------------

const DescriptionSx: SxProps<Theme> = {
    px: 1,
    height: "100%",
    bgcolor: (theme) =>
        theme.palette.mode === "light"
            ? theme.palette.neutral?.[200]
            : theme.palette.neutral?.[700],
    borderRadius: "5px",
};

// ---------------------------------------------------------------------------

interface Props {
    content: string;
}

const Description: FC<Props> = ({ content }) => (
    <Editor editable={false} content={content} containerSx={DescriptionSx} />
);

export default Description;
