import { styled } from "@mui/material/styles";

const DraftEditorRoot = styled("div")(({ theme }) => ({
    display: "flex",
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    "& .rdw-editor-wrapper": {
        fontFamily: theme.typography.fontFamily,
        flexGrow: 1,
    },
    "& .DraftEditor-editorContainer, & .DraftEditor-root": {
        height: "auto", // Override 'inherit' with 'auto'
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

    // Indent Buttons
    "& .indent-20": {
        paddingLeft: "20px",
    },
    "& .indent-40": {
        paddingLeft: "40px",
    },
    "& .indent-60": {
        paddingLeft: "60px",
    },
    "& .indent-80": {
        paddingLeft: "80px",
    },
    "& .indent-100": {
        paddingLeft: "100px",
    },
    "& .indent-120": {
        paddingLeft: "120px",
    },
    "& .indent-140": {
        paddingLeft: "140px",
    },
    "& .indent-160": {
        paddingLeft: "160px",
    },
    "& .indent-180": {
        paddingLeft: "180px",
    },
    "& .indent-200": {
        paddingLeft: "200px",
    },
    "& .indent-220": {
        paddingLeft: "200px",
    },
}));

export default DraftEditorRoot;
