import {
    Stack,
    Paper as MuiPaper,
    Typography,
    IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { INote } from "src/types/note";
import Iconify from "src/components/iconify/Iconify";
import Avatar from "@/components/Avatar";
import { PropertyLabel } from "./Extra";

const Paper = styled(MuiPaper)(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === "light"
            ? "#fce9a4"
            : theme.palette.neutral?.[700],
}));

interface NoteProps {
    note: INote;
    onRemove: () => void;
}

const Note: React.FC<NoteProps> = (props) => {
    const { note, onRemove } = props;
    const { creator, propertyId, propertyCode } = note || {};

    const createdAt = new Date(note.createdAt);

    const formattedDate = `${createdAt.getHours()}:${createdAt.getMinutes()} ${createdAt.getDate()}/${
        createdAt.getMonth() + 1
    }/${createdAt.getFullYear()}`;

    const username = `${creator?.firstName || ""}  ${
        note.creator.lastName || ""
    }`;

    return (
        <Stack direction="row" spacing={1} width={1}>
            <Avatar
                src={creator?.avatar}
                firstName={creator?.firstName}
                lastName={creator?.lastName}
            />

            <Stack spacing={1} width={1}>
                {Boolean(propertyCode) && Boolean(propertyId) ? (
                    <PropertyLabel id={propertyId!} code={propertyCode!} />
                ) : null}

                <Paper
                    sx={{
                        p: 1.5,
                        flexGrow: 1,
                    }}
                >
                    <Stack
                        justifyContent="space-between"
                        direction={{ xs: "column", sm: "row" }}
                        alignItems={{ sm: "center" }}
                    >
                        <Typography variant="subtitle2">{username}</Typography>
                        <Typography
                            variant="caption"
                            sx={{ color: "text.disabled" }}
                        >
                            {formattedDate}
                        </Typography>
                    </Stack>

                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        mt={1}
                    >
                        <Typography variant="body2" color="text.secondary">
                            {note.content.toString()}
                        </Typography>
                        <IconButton onClick={onRemove}>
                            <Iconify
                                icon="eva:trash-2-outline"
                                fontSize="20px"
                            />
                        </IconButton>
                    </Stack>
                </Paper>
            </Stack>
        </Stack>
    );
};

export default Note;
