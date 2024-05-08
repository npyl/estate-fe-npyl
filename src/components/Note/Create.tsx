import { Box, Stack } from "@mui/material";
import AddNote from "./AddNote";
import { Note } from "src/components/Note";
import { INote } from "src/types/note";
import { useTranslation } from "react-i18next";
import Panel from "../Panel";

interface INoteCreate {
    notes: INote[];
    onAdd: (message: string) => void;
    onRemove: (index: number) => void;
}

const NoteCreate = ({ notes, onAdd, onRemove }: INoteCreate) => {
    const { t } = useTranslation();

    return (
        <Panel label={t("Notes")}>
            <Box overflow="auto" flexGrow={1} height="400px">
                <Stack spacing={1.5}>
                    {notes.map((note, index) => (
                        <Note
                            key={note.id}
                            onRemove={() => onRemove(index)}
                            note={note}
                        />
                    ))}
                </Stack>
            </Box>
            <AddNote onAdd={onAdd} />
        </Panel>
    );
};

export default NoteCreate;
