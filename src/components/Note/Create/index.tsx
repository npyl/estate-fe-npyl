import { SxProps, Theme } from "@mui/material";
import AddNote from "../AddNote";
import { Note } from "src/components/Note";
import { INote } from "src/types/note";
import { useTranslation } from "react-i18next";
import Panel from "../../Panel";
import { FC, useCallback, useRef, useMemo } from "react";
import { PROPERTY_CHIP_CLASSNAME } from "../Note/Extra";
import ScrollContainer, { ScrollContainerRef } from "./ScrollContainer";
import { NOTE_CLASSNAME } from "../Note";

const ContainerSx: SxProps<Theme> = {
    // Remove default margins
    "& > *": { margin: "0 !important" },

    gap: 0.2,
    p: 2,

    [`& .${NOTE_CLASSNAME}`]: {
        alignSelf: "flex-start",

        "& .pp-note-content": {
            borderRadius: "20px",
        },

        // First in group
        "&:has(+ .current-user)": {
            "& .pp-note-content": {
                borderRadius: "20px 20px 4px 4px",
            },
        },

        // Middle messages
        "& + .current-user": {
            paddingLeft: "40px",

            "& .pp-note-avatar, .pp-note-fullname": {
                display: "none",
            },

            "& .pp-note-content": {
                borderRadius: "4px",
            },
        },

        // Last message in group
        "&:not(:has(+ .current-user))": {
            "& .pp-note-content": {
                borderRadius: "4px 4px 20px 20px",
            },
        },
    },
};

interface INoteCreate {
    notes: INote[];
    chip?: boolean;
    onAdd: (message: string) => Promise<boolean>;
    onRemove: (index: number) => void;

    sx?: SxProps<Theme>;
}

const NoteCreate: FC<INoteCreate> = ({
    notes,
    chip = false,
    sx,
    onAdd,
    onRemove,
}) => {
    const { t } = useTranslation();

    const scrollRef = useRef<ScrollContainerRef>(null);

    const seenPropertyCodes = useMemo(() => {
        const seen = new Set<string>();
        return notes.map((note) => {
            const propertyCode = note.propertyCode;

            if (propertyCode && !seen.has(propertyCode)) {
                seen.add(propertyCode);
                return { ...note, showChip: true };
            }
            // Otherwise, hide the chip
            return { ...note, showChip: false };
        });
    }, [notes]);

    const handleAdd = useCallback(
        async (m: string) => {
            const ok = await onAdd(m);
            if (!ok) return;

            scrollRef.current?.scroll();
        },
        [onAdd]
    );

    return (
        <Panel label={t("Notes")} headerSx={{ boxShadow: 3 }}>
            <ScrollContainer
                ref={scrollRef}
                overflow="hidden auto"
                height="400px"
                py={1}
                mb={2}
                sx={{
                    ...ContainerSx,

                    // INFO: overrides the one below
                    [`.${PROPERTY_CHIP_CLASSNAME}`]: {
                        display: chip ? "block" : "none",
                    },

                    ...sx,
                }}
            >
                {seenPropertyCodes.map((note, index) => (
                    <Note
                        key={note.id}
                        onRemove={() => onRemove(index)}
                        note={note}
                        sx={{
                            [`.${PROPERTY_CHIP_CLASSNAME}`]: {
                                display: note.showChip ? "block" : "none",

                                my: 1,
                                position: "sticky",
                                top: 0,
                                zIndex: 50000,
                            },
                        }}
                    />
                ))}
            </ScrollContainer>
            <AddNote onAdd={handleAdd} />
        </Panel>
    );
};

export default NoteCreate;
