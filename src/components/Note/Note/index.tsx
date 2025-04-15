import {
    Stack,
    Typography,
    IconButton,
    StackProps,
    SxProps,
    Theme,
    Paper,
} from "@mui/material";
import { INote } from "src/types/note";
import Iconify from "src/components/iconify/Iconify";
import Avatar from "@/components/Avatar";
import { PropertyLabel } from "./Extra";
import { FC, useMemo } from "react";
import { useAuth } from "@/hooks/use-auth";
import CreatedAt from "./CreatedAt";

const NOTE_CLASSNAME = "pp-note";
const AVATAR_CLASSNAME = "pp-note-avatar";
const FULLNAME_CLASSNAME = "pp-note-fullname";

const PaperSx: SxProps<Theme> = {
    backgroundColor: ({ palette: { mode, neutral } }) =>
        mode === "light" ? "#fce9a4" : neutral?.[700],
    p: 1.5,
    position: "relative",
    minHeight: "75px",
};

const ButtonSx: SxProps<Theme> = {
    width: "fit-content",
    alignSelf: "flex-end",
};

interface NoteProps extends StackProps {
    note: INote;
    onRemove: () => void;
}

const Note: FC<NoteProps> = ({ note, onRemove, ...props }) => {
    const { creator, propertyId, propertyCode } = note || {};

    const username = `${creator?.firstName || ""}  ${
        note.creator.lastName || ""
    }`;

    const { user } = useAuth();
    const withChip = Boolean(propertyCode) && Boolean(propertyId);

    const className = useMemo(() => {
        let res = NOTE_CLASSNAME;

        const isCurrentUser = creator.id === user?.id;

        if (isCurrentUser) res = `${res} current-user`;
        if (withChip) res = `${res} with-chip-${propertyCode}`;

        return res;
    }, [user?.id, creator?.id, withChip, propertyCode]);

    return (
        <Stack
            className={className}
            direction="row"
            spacing={1}
            width={1}
            {...props}
        >
            <Avatar
                className={AVATAR_CLASSNAME}
                src={creator?.avatar}
                firstName={creator?.firstName}
                lastName={creator?.lastName}
            />

            <Stack width={1}>
                <Stack direction="row" spacing={1}>
                    <Typography
                        className={FULLNAME_CLASSNAME}
                        variant="subtitle2"
                    >
                        {username}
                    </Typography>

                    {withChip ? (
                        <PropertyLabel id={propertyId!} code={propertyCode!} />
                    ) : null}
                </Stack>

                <Paper className="pp-note-content" sx={PaperSx}>
                    <Stack position="absolute" top={10} right={15}>
                        <CreatedAt createdAt={note.createdAt} />

                        <IconButton sx={ButtonSx} onClick={onRemove}>
                            <Iconify
                                icon="eva:trash-2-outline"
                                fontSize="20px"
                            />
                        </IconButton>
                    </Stack>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                        width={`calc(100% - 90px)`}
                    >
                        {note.content}
                    </Typography>
                </Paper>
            </Stack>
        </Stack>
    );
};

export { NOTE_CLASSNAME };
export default Note;
