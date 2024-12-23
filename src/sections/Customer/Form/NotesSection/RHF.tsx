import NoteCreate from "@/components/Note/Create";
import { useAuth } from "@/hooks/use-auth";
import { INote } from "@/types/note";
import { useCallback, useMemo } from "react";
import { useFormContext } from "react-hook-form";

const RHFNoteSection = () => {
    const { user } = useAuth();
    const { watch, setValue } = useFormContext();

    const contents = (watch("notes") || []) as string[];

    const notes = useMemo(
        () =>
            contents.map((content, index) => ({
                id: index,
                content,
                creator: user,
                createdAt: new Date(),
                updatedAt: new Date(),
            })) as INote[],
        [contents]
    );

    const handleAdd = useCallback((s: string) => {
        const old = (watch("notes") || []) as string[];
        setValue("notes", [...old, s]);
    }, []);

    const handleRemove = useCallback((i: number) => {
        const old = (watch("notes") || []) as string[];
        setValue(
            "notes",
            old.filter((_, ind) => ind !== i)
        );
    }, []);

    return (
        <NoteCreate notes={notes} onAdd={handleAdd} onRemove={handleRemove} />
    );
};

export default RHFNoteSection;
