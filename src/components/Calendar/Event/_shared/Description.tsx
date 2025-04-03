import Editor, { EditorProps } from "@/components/Editor";
import { SxProps, Theme } from "@mui/material";
import { FC } from "react";

// ---------------------------------------------------------------------------

const DescriptionSx: SxProps<Theme> = {
    px: 1,
    height: "100%",
    bgcolor: "transparent",
    borderRadius: "5px",
};

// ---------------------------------------------------------------------------

interface Props extends EditorProps {
    content: string;
}

const Description: FC<Props> = ({ content, containerSx, ...props }) => (
    <Editor
        className="PPEvent-Description"
        editable={false}
        content={content}
        containerSx={{ ...DescriptionSx, ...containerSx }}
        {...props}
    />
);

export default Description;
