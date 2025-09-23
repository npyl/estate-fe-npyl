import { FC } from "react";
import NoteCreate, { NoteCreateProps } from "./Create";
import { SettingsProvider } from "./Context";
import useNotesControlledUncontrolled from "./useNotesControlledUncontrolled";
import { INote } from "@/types/note";
import { LabelResourceType } from "@/types/label";

interface NoteSectionProps extends Omit<NoteCreateProps, "notes"> {
    resource: LabelResourceType;
    resourceId?: number;

    // -------------- Controlled Start --------------

    notes?: INote[];
    onAdd?: (message: string) => Promise<boolean>;
    onRemove?: (index: number) => void;
    // -------------- Controlled End --------------
}

const NoteSection: FC<NoteSectionProps> = ({
    resource,
    resourceId,
    // ...
    notes: _notes,
    onAdd,
    onRemove,
    // ...
    ...props
}) => {
    const notes = useNotesControlledUncontrolled(_notes, resource, resourceId);
    return (
        <SettingsProvider
            resourceId={resourceId}
            onAdd={onAdd}
            onRemove={onRemove}
        >
            <NoteCreate notes={notes} {...props} />
        </SettingsProvider>
    );
};

export type { NoteSectionProps };
export default NoteSection;
