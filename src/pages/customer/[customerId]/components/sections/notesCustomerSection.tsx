import SendIcon from "@mui/icons-material/Send";
import {
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  InputBase,
  Paper,
  Typography,
} from "@mui/material";
import { Box, Stack, alpha } from "@mui/system";
import { useRouter } from "next/router";
import * as React from "react";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Note, NoteCreate } from "src/components/Note";
import {
  useAddNoteToCustomerWithIdMutation,
  useDeleteWithIdMutation,
  useGetNotesByCustomerIdQuery,
} from "src/services/note";

const NotesCustomerSection: React.FC = () => {
  const router = useRouter();
  const { customerId } = router.query;
  const { t } = useTranslation();
  const notes = useGetNotesByCustomerIdQuery(
    parseInt(customerId as string)
  ).data;

  const [addNote, { isSuccess }] = useAddNoteToCustomerWithIdMutation();
  const [deleteNote, { isSuccess: isDeleteSuccess }] =
    useDeleteWithIdMutation();
  const handleAddNote = (message: string) =>
    addNote({ id: +customerId!, dataToSend: { content: message } });

  const hadleRemove = (index: number) =>
    notes && notes[index].id && deleteNote(notes[index].id!);

  if (!customerId) return;

  return (
    <NoteCreate
      notes={notes || []}
      onAdd={handleAddNote}
      onRemove={hadleRemove}
    />
  );
};

export default NotesCustomerSection;
