import { Note } from "@/components/Note";
import { INote } from "src/types/note";
import { useMemo } from "react";
import { PROPERTY_CHIP_CLASSNAME } from "../Note/Extra";
import { AVATAR_CLASSNAME, FULLNAME_CLASSNAME } from "../Note";

const useNotes = (
    notes: INote[],
    chip: boolean,
    onRemove: (idx: number) => void
) => {
    return useMemo(() => {
        const ids: number[] = [];
        const seen = new Set<string>();
        let lastUserId: number | null = null;

        const NOTES = notes.map((note, idx) => {
            const userId = note.creator.id;
            const propertyCode = note.propertyCode;

            ids.push(note.id);

            // Check if this is the first occurrence of a property
            const isFirstProperty = propertyCode && !seen.has(propertyCode);
            if (isFirstProperty) seen.add(propertyCode);

            // Determine position in the conversation flow
            const isUserChange = lastUserId !== userId;
            lastUserId = userId;

            // Create style override for avatar and fullname visibility
            const avatarDisplay = isUserChange ? "flex" : "none";
            const fullnameDisplay = isUserChange ? "block" : "none";
            const chipDisplay = chip && isFirstProperty ? "block" : "none";

            return (
                <Note
                    key={note.id}
                    onRemove={() => onRemove(idx)}
                    note={note}
                    sx={{
                        // Property chip display
                        [`.${PROPERTY_CHIP_CLASSNAME}`]: {
                            display: chipDisplay,
                        },

                        // Control avatar visibility
                        [`.${AVATAR_CLASSNAME}`]: {
                            display: avatarDisplay,
                        },

                        // Control fullname visibility
                        [`.${FULLNAME_CLASSNAME}`]: {
                            display: fullnameDisplay,
                        },
                    }}
                />
            );
        });

        return [NOTES, ids] as const;
    }, [notes, chip]);
};

export default useNotes;
