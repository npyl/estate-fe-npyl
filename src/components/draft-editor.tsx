import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import type { FC } from "react";
import dynamic from "next/dynamic";
import type { EditorProps } from "react-draft-wysiwyg";
import { styled } from "@mui/material/styles";
import type { Theme } from "@mui/material";
import type { SxProps } from "@mui/material";
import BlockQuoteIcon from "@mui/icons-material/FormatQuote";

const Editor = dynamic(
    async () => {
        const m = await import("react-draft-wysiwyg");
        return m.Editor;
    },
    { ssr: false }
);

interface DraftEditorProps extends Omit<EditorProps, "toolbar"> {
    sx?: SxProps<Theme>;
}

const DraftEditorRoot = styled("div")(({ theme }) => ({
    display: "flex",
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    "& .rdw-editor-wrapper": {
        fontFamily: theme.typography.fontFamily,
        flexGrow: 1,
    },
    "& .rdw-editor-toolbar": {
        backgroundColor: "transparent",
        borderBottom: `1px solid ${theme.palette.divider}`,
        borderLeft: "none",
        borderRight: "none",
        borderTop: "none",
        marginBottom: 0,
    },
    "& .rdw-option-wrapper": {
        backgroundColor:
            theme.palette.mode === "light"
                ? "transparent"
                : theme.palette.neutral?.[600],
        border: "none",
    },
    "& .rdw-option-wrapper:hover": {
        backgroundColor:
            theme.palette.mode === "light"
                ? theme.palette.action.selected
                : theme.palette.neutral?.[500],
        boxShadow: "none",
    },
    "& .rdw-option-active": {
        backgroundColor:
            theme.palette.mode === "light"
                ? theme.palette.action.selected
                : theme.palette.neutral?.[300],
        boxShadow: "none",
    },
    "& .rdw-dropdown-wrapper": {
        backgroundColor: "transparent",
        border: `1px solid ${theme.palette.divider}`,
        color: theme.palette.text.primary,
    },
    "& .rdw-dropdown-wrapper:hover": {
        backgroundColor: theme.palette.action.hover,
        boxShadow: "none",
    },
    "& .rdw-dropdown-optionwrapper": {
        backgroundColor: theme.palette.background.paper,
        border: "none",
        boxShadow: theme.shadows[10],
        padding: 0,
        width: "max-content",
    },
    "& .rdw-dropdown-optionwrapper:hover": {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[10],
    },
    "& .rdw-dropdownoption-active": {
        backgroundColor: "transparent",
    },
    "& .rdw-dropdownoption-highlighted": {
        backgroundColor: theme.palette.action.hover,
    },
    "& .rdw-colorpicker-modal": {
        backgroundColor: theme.palette.background.paper,
        border: "none",
        boxShadow: theme.shadows[10],
        width: 260,
        height: "auto",
    },
    "& .rdw-colorpicker-modal-options": {
        //overflow: "auto",
    },
    "& .rdw-link-modal": {
        backgroundColor: theme.palette.background.paper,
        border: "none",
        boxShadow: theme.shadows[10],
        width: 260,
    },
    "& .rdw-embedded-modal": {
        backgroundColor: theme.palette.background.paper,
        border: "none",
        boxShadow: theme.shadows[10],
        //overflowY: "auto",
        width: 260,
    },
    "& .rdw-embedded-modal-header": {
        display: "none",
    },
    "& .rdw-emoji-modal": {
        backgroundColor: theme.palette.background.paper,
        border: "none",
        boxShadow: theme.shadows[10],
        //overflowY: "auto",
        width: 260,
    },
    "& .rdw-image-modal": {
        backgroundColor: theme.palette.background.paper,
        border: "none",
        boxShadow: theme.shadows[10],
        //overflowY: "auto",
        width: 260,
    },
    "& .rdw-image-modal-header": {
        display: "none",
    },
    "& .rdw-editor-main": {
        color: theme.palette.text.primary,
        padding: theme.spacing(2),
    },
    "& .public-DraftEditorPlaceholder-root": {
        color: theme.palette.text.secondary,
    },
    "& .public-DraftStyleDefault-block": {
        margin: 0,
    },

    "& .public-DraftEditor-content": {
        overflowWrap: "anywhere !important", // Adding this line
    },

    "& .rdw-dropdownoption-default": {
        padding: theme.spacing(2),
    },
}));

// TODO: types for this??
const toolbarOptions = {
    options: [
        "inline",
        "blockType",
        "list",
        "textAlign",
        "link",
        "emoji",
        "image",
        "remove",
        "history",
    ],
    blockType: {
        inDropdown: true,
        options: ["Normal", "H1", "H2", "H3", "H4", "H5", "H6", "Blockquote"],
        blockquote: { icon: <BlockQuoteIcon /> },
    },
};

const DraftEditor: FC<DraftEditorProps> = ({ sx, ...other }) => (
    <DraftEditorRoot sx={sx}>
        <Editor {...other} toolbar={toolbarOptions} />
    </DraftEditorRoot>
);

export default DraftEditor;
