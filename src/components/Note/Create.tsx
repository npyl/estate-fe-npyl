import { Box, Stack, StackProps, SxProps, Theme } from "@mui/material";
import AddNote from "./AddNote";
import { Note } from "src/components/Note";
import { INote } from "src/types/note";
import { useTranslation } from "react-i18next";
import Panel from "../Panel";
import {
    FC,
    forwardRef,
    useCallback,
    useImperativeHandle,
    useRef,
} from "react";
import sleep from "@/utils/sleep";
import { PROPERTY_CHIP_CLASSNAME } from "./Note/Extra";

// -------------------------------------------------------------------------------

interface ScrollContainerRef {
    scroll: VoidFunction;
}

const ScrollContainer = forwardRef<ScrollContainerRef, StackProps>(
    ({ children, ...props }, ref) => {
        const localRef = useRef<HTMLDivElement>(null);
        const endBoxRef = useRef<HTMLDivElement>(null);

        const scroll = useCallback(async () => {
            if (!localRef.current) return;

            // IMPORTANT: wait for rerenders to finish
            await sleep(100);

            const hasScrollbar =
                localRef.current.scrollHeight > localRef.current.clientHeight;

            if (!hasScrollbar) return;

            // Save current body scroll position
            const bodyScrollPos = window.scrollY;

            // Scroll to the end box
            endBoxRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "end",
            });

            window.scrollTo({
                top: bodyScrollPos,
                behavior: "auto", // Use 'auto' to avoid another smooth scroll
            });
        }, []);

        useImperativeHandle(ref, () => ({ scroll }), []);

        return (
            <Stack ref={localRef} pr={2} mr={-2} {...props}>
                {children}
                <Box ref={endBoxRef} />
            </Stack>
        );
    }
);

// -------------------------------------------------------------------------------

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
                spacing={1}
                py={1}
                sx={{
                    [`.${PROPERTY_CHIP_CLASSNAME}`]: {
                        display: chip ? "block" : "none",
                    },
                    ...sx,
                }}
            >
                {notes.map((note, index) => (
                    <Note
                        key={note.id}
                        onRemove={() => onRemove(index)}
                        note={note}
                    />
                ))}
            </ScrollContainer>
            <AddNote onAdd={handleAdd} />
        </Panel>
    );
};

export default NoteCreate;
