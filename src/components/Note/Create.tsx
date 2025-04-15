import { Box, Stack, StackProps } from "@mui/material";
import AddNote from "./AddNote";
import { Note } from "src/components/Note";
import { INote } from "src/types/note";
import { useTranslation } from "react-i18next";
import Panel from "../Panel";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import sleep from "@/utils/sleep";

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

            // Restore the body scroll position
            setTimeout(() => {
                window.scrollTo({
                    top: bodyScrollPos,
                    behavior: "auto", // Use 'auto' to avoid another smooth scroll
                });
            }, 0);
        }, []);

        useImperativeHandle(ref, () => ({ scroll }), []);

        return (
            <Stack ref={localRef} {...props}>
                {children}
                <Box ref={endBoxRef} />
            </Stack>
        );
    }
);

// -------------------------------------------------------------------------------

interface INoteCreate {
    notes: INote[];
    onAdd: (message: string) => Promise<boolean>;
    onRemove: (index: number) => void;
}

const NoteCreate = ({ notes, onAdd, onRemove }: INoteCreate) => {
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
                maxHeight="400px"
                spacing={1}
                py={1}
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
