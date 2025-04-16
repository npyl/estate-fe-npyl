import { Stack, Typography, StackProps } from "@mui/material";
import { INote } from "src/types/note";
import Avatar from "@/components/Avatar";
import { PropertyLabel } from "./Extra";
import { FC } from "react";
import Body from "./Body";

const NOTE_CLASSNAME = "message";
const CONTENT_CLASSNAME = "pp-message-content";
const AVATAR_CLASSNAME = "pp-message-avatar";
const FULLNAME_CLASSNAME = "pp-message-fullname";

interface NoteProps extends StackProps {
    note: INote;
    onRemove: VoidFunction;
}

const Note: FC<NoteProps> = ({ note, onRemove, className = "", ...props }) => {
    const { creator, propertyId, propertyCode } = note || {};
    const withChip = Boolean(propertyCode) && Boolean(propertyId);

    const username = `${creator?.firstName || ""}  ${creator.lastName || ""}`;

    const fullClassName = `${NOTE_CLASSNAME} user-${creator.id} ${className}`;

    return (
        <Stack className={fullClassName} width={1} {...props}>
            <Stack direction="row" spacing={1} alignItems="center">
                <Avatar
                    className={AVATAR_CLASSNAME}
                    src={creator?.avatar}
                    firstName={creator?.firstName}
                    lastName={creator?.lastName}
                />

                <Typography className={FULLNAME_CLASSNAME} variant="subtitle2">
                    {username}
                </Typography>

                {withChip ? (
                    <PropertyLabel id={propertyId!} code={propertyCode!} />
                ) : null}
            </Stack>

            <Body
                className={CONTENT_CLASSNAME}
                content={note.content}
                createdAt={note.createdAt}
                onRemove={onRemove}
            />
        </Stack>
    );
};

export {
    NOTE_CLASSNAME,
    CONTENT_CLASSNAME,
    AVATAR_CLASSNAME,
    FULLNAME_CLASSNAME,
};
export default Note;
