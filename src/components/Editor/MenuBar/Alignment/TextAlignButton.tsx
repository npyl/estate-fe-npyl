import { FC, useCallback } from "react";

import { IconButton } from "@mui/material";

import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import { useEditorContext } from "../../context";

const getIcon = (align: string) =>
    align === "left" ? (
        <FormatAlignLeftIcon />
    ) : align === "center" ? (
        <FormatAlignCenterIcon />
    ) : align === "right" ? (
        <FormatAlignRightIcon />
    ) : (
        <FormatAlignJustifyIcon />
    );

interface TextAlignButtonProps {
    textAlign: string;
}

const TextAlignButton: FC<TextAlignButtonProps> = ({ textAlign }) => {
    const { editor } = useEditorContext();

    const color = editor!.isActive({ textAlign }) ? "primary" : "default";

    const handleAlign = useCallback(
        () => editor!.chain().focus().setTextAlign(textAlign).run(),
        []
    );

    return (
        <IconButton size="small" onClick={handleAlign} color={color}>
            {getIcon(textAlign)}
        </IconButton>
    );
};

export default TextAlignButton;
