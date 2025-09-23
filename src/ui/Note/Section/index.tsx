import { FC } from "react";
import NoteCreate, { NoteCreateProps } from "./Create";
import { SettingsProvider } from "./Context";
import useNotesControlledUncontrolled from "./useNotesControlledUncontrolled";
import { INote } from "@/types/note";

interface NoteSectionProps extends Omit<NoteCreateProps, "notes"> {
    // -------------- Controlled Start --------------
    notes?: INote[];
    onAdd?: (message: string) => Promise<boolean>;
    onRemove?: (index: number) => void;
    // -------------- Controlled End --------------
}

const NoteSection: FC<NoteSectionProps> = ({
    notes: _notes,
    onAdd,
    onRemove,
    ...props
}) => {
    const notes = useNotesControlledUncontrolled(_notes, props.resourceId);
    return (
        <SettingsProvider
            resourceId={props.resourceId}
            onAdd={onAdd}
            onRemove={onRemove}
        >
            <NoteCreate notes={notes} {...props} />
        </SettingsProvider>
    );
};

export type { NoteSectionProps };
export default NoteSection;
