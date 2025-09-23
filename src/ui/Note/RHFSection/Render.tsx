import NoteCreate, { NoteSectionProps } from "@/ui/Note/Section";
import { useAuth } from "@/sections/use-auth";
import { INote } from "@/types/note";
import { FC, useCallback, useMemo } from "react";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

type SectionProps = Omit<NoteSectionProps, "notes" | "onAdd" | "onRemove">;

type RenderProps = {
    field: ControllerRenderProps<FieldValues, string>;
    noteSectionProps: SectionProps;
};

const Render: FC<RenderProps> = ({
    field: { value, onChange },
    noteSectionProps,
}) => {
    const { user } = useAuth();

    const notes = useMemo(
        () =>
            value.map((content: string, i: number) => ({
                id: i,
                content,
                creator: user,
                createdAt: new Date(),
                updatedAt: new Date(),
            })) as INote[],
        [value]
    );

    const handleAdd = useCallback(async (s: string) => {
        onChange([...value, s]);
        return true;
    }, []);

    const handleRemove = useCallback((i: number) => {
        onChange(value.filter((_: any, ind: number) => ind !== i));
    }, []);

    return (
        <NoteCreate
            notes={notes}
            onAdd={handleAdd}
            onRemove={handleRemove}
            {...noteSectionProps}
        />
    );
};

export type { SectionProps };
export default Render;
