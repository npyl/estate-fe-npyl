import Stack from "@mui/material/Stack";
import MenuBarButton from "./MenuBarButton";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import { useEditorContext } from "../context";
import { FC, useCallback } from "react";
import { getBubbleSx } from "./styled";

interface HistoryProps {
    bubble: boolean;
}

const History: FC<HistoryProps> = ({ bubble }) => {
    const { editor } = useEditorContext();

    const disabled0 = !editor?.can().undo();
    const disabled1 = !editor?.can().redo();

    const undo = useCallback(() => {
        editor?.chain().focus().undo().run();
    }, []);
    const redo = useCallback(() => {
        editor?.chain().focus().redo().run();
    }, []);

    return (
        <Stack
            left={-85}
            direction="row"
            alignItems="center"
            position={bubble ? "absolute" : "unset"}
            sx={getBubbleSx(bubble)}
        >
            <MenuBarButton
                icon={<UndoIcon />}
                disabled={disabled0}
                onClick={undo}
            />
            <MenuBarButton
                icon={<RedoIcon />}
                disabled={disabled1}
                onClick={redo}
            />
        </Stack>
    );
};

export default History;
