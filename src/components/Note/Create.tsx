import { Box, Divider, Grid, Paper, Stack, Typography } from "@mui/material";
import * as React from "react";
import AddNote from "./AddNote";
import { Note } from "src/components/Note";
import { useProfileQuery } from "src/services/user";
import { INotePOST } from "src/types/note";
import { useTranslation } from "react-i18next";

interface INoteCreate {
    notes: INotePOST[];
    onAdd: (message: string) => void;
    onRemove: (index: number) => void;
}

const NoteCreate = (props: INoteCreate) => {
    const { notes, onAdd, onRemove } = props;
    const profile = useProfileQuery().data; // current user
    const { t } = useTranslation();
    if (!profile) return null;

    return (
        <Paper
            elevation={10}
            sx={{
                display: "flex",
                flexDirection: "column",
                height: "400px", // fixed height

                padding: 0,
            }}
        >
            <Box
                sx={{
                    px: 3,
                    py: 1.5,
                    display: "flex",
                    justifyContent: "left",
                }}
            >
                <Typography variant="h6">{t("Notes")}</Typography>
            </Box>
            <Divider></Divider>
            <Box sx={{ overflow: "auto", flexGrow: 1 }}>
                <Grid container>
                    <Grid item xs={12} padding={2}>
                        <Stack spacing={1.5} sx={{ px: 3, pb: 2 }}>
                            {notes &&
                                notes.length > 0 &&
                                notes.map((note, index) => {
                                    const currentDate = new Date();
                                    const formattedDate =
                                        currentDate.toLocaleString("en-US", {
                                            year: "numeric",
                                            month: "2-digit",
                                            day: "2-digit",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            second: "2-digit",
                                            fractionalSecondDigits: 1,
                                        });

                                    return (
                                        <Note
                                            onRemove={() => onRemove(index)}
                                            note={{
                                                content: note.content,
                                                creator: profile,
                                                createdAt: new Date(),
                                                updatedAt: new Date(),
                                            }}
                                            key={index}
                                        />
                                    );
                                })}
                        </Stack>
                    </Grid>
                </Grid>
            </Box>
            <AddNote
                onAdd={(message) => {
                    onAdd(message);
                }}
            />
        </Paper>
    );
};
export default NoteCreate;
