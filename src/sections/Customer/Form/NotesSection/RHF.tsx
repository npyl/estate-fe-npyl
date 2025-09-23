import NoteCreate from "@/ui/Note/Create";
import { useAuth } from "@/sections/use-auth";
import { INote } from "@/types/note";
import { useCallback, useMemo } from "react";
import { useFormContext, useWatch } from "react-hook-form";

const RHFNoteSection = () => {
    const { user } = useAuth();
    const { watch, setValue } = useFormContext();

    const contents = (useWatch({ name: "notes" }) || []) as string[];

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

    const handleAdd = useCallback(async (s: string) => {
        const old = (watch("notes") || []) as string[];
        setValue("notes", [...old, s]);

        return true;
    }, []);

    const handleRemove = useCallback((i: number) => {
        const old = (watch("notes") || []) as string[];
        setValue(
            "notes",
            old.filter((_, ind) => ind !== i)
        );
    }, []);

    return (
        <NoteCreate
            chip
            notes={notes}
            onAdd={handleAdd}
            onRemove={handleRemove}
        />
    );
};

export default RHFNoteSection;
