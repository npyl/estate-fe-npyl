import { SxProps, Theme } from "@mui/material";
import AddNote from "./AddNote";
import { INote } from "@/types/note";
import { useTranslation } from "react-i18next";
import Panel from "@/components/Panel";
import { FC, useRef } from "react";
import ScrollContainer, { ScrollContainerRef } from "./ScrollContainer";
import { CONTENT_CLASSNAME, NOTE_CLASSNAME } from "@/ui/Note/Note";
import useNotes from "./useNotes";
import useOnAddEffect from "./useOnAddEffect";
import { LabelResourceType } from "@/types/label";

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

interface NoteCreateProps {
    resource: LabelResourceType;
    resourceId?: number;

    notes: INote[];
    chip?: boolean;
    sx?: SxProps<Theme>;
}

const NoteCreate: FC<NoteCreateProps> = ({
    notes,
    chip = false,
    resource,
    resourceId,
    sx,
}) => {
    const { t } = useTranslation();
    const scrollRef = useRef<ScrollContainerRef>(null);

    const [NOTES, ids] = useNotes(notes, chip);
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
            <AddNote resource={resource} resourceId={resourceId} />
        </Panel>
    );
};

export type { NoteCreateProps };
export default NoteCreate;
