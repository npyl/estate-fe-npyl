import { useCallback } from "react";

import Stack from "@mui/material/Stack";
import { IconButton } from "@mui/material";

import AddIndentIcon from "@mui/icons-material/FormatIndentIncrease";
import RemoveIndentIcon from "@mui/icons-material/FormatIndentDecrease";
import { useEditorContext } from "../context";

const IndentButton = () => {
    const { editor } = useEditorContext();

    const handleClick = useCallback(
        () => editor!.chain().focus().indent().run(),
        []
    );

    return (
        <IconButton onClick={handleClick}>
            <AddIndentIcon />
        </IconButton>
    );
};

const OutdentButton = () => {
    const { editor } = useEditorContext();

    const handleClick = useCallback(
        () => editor!.chain().focus().outdent().run(),
        []
    );

    return (
        <IconButton onClick={handleClick}>
            <RemoveIndentIcon />
        </IconButton>
    );
};

const Indentation = () => (
    <Stack direction="row" alignItems="center">
        <IndentButton />
        <OutdentButton />
    </Stack>
);

export default Indentation;
