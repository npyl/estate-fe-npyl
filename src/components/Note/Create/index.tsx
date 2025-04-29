import { SxProps, Theme } from "@mui/material";
import AddNote from "../AddNote";
import { INote } from "src/types/note";
import { useTranslation } from "react-i18next";
import Panel from "../../Panel";
import { FC, useRef } from "react";
import ScrollContainer, { ScrollContainerRef } from "./ScrollContainer";
import { CONTENT_CLASSNAME, NOTE_CLASSNAME } from "../Note";
import useNotes from "./useNotes";
import useOnAddEffect from "./useOnAddEffect";

const ContainerSx: SxProps<Theme> = {
    "& > *": { margin: "0 !important" },

    gap: 0.1,

    [`& .${NOTE_CLASSNAME}`]: {
        alignSelf: "flex-start",
    },

    // First in group - full rounded top
    [`& .${NOTE_CLASSNAME}.first-in-group:not(.standalone)`]: {
        [`.${CONTENT_CLASSNAME}`]: {
            borderRadius: "20px 20px 4px 4px",
        },
    },

    // Middle in group - flat top and bottom
    [`& .${NOTE_CLASSNAME}.middle-in-group`]: {
        [`.${CONTENT_CLASSNAME}`]: {
            borderRadius: "4px",
        },
    },

    // Last in group - full rounded bottom
    [`& .${NOTE_CLASSNAME}.last-in-group`]: {
        [`.${CONTENT_CLASSNAME}`]: {
            borderRadius: "4px 4px 20px 20px",
        },
    },

    // Standalone message - fully rounded
    [`& .${NOTE_CLASSNAME}.standalone`]: {
        [`.${CONTENT_CLASSNAME}`]: {
            borderRadius: "20px",
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

    const [NOTES, ids] = useNotes(notes, chip, onRemove);
    useOnAddEffect(ids, (id) => {
        scrollRef.current?.scroll(id);
    });

    return (
        <Panel label={t("Notes")} headerSx={{ boxShadow: 3 }}>
            <ScrollContainer
                ref={scrollRef}
                overflow="hidden auto"
                height="400px"
                py={1}
                mb={2}
                sx={{ ...ContainerSx, ...sx }}
            >
                {NOTES}
            </ScrollContainer>
            <AddNote onAdd={onAdd} />
        </Panel>
    );
};

export default NoteCreate;
