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
        const seen = new Set<string>();
        let lastUserId: number | null = null;

        return notes.map((note, idx) => {
            const userId = note.creator.id;
            const propertyCode = note.propertyCode;

            // Check if this is the first occurrence of a property
            const isFirstProperty = propertyCode && !seen.has(propertyCode);
            if (isFirstProperty) seen.add(propertyCode);

            // Determine position in the conversation flow
            const isUserChange = lastUserId !== userId;
            lastUserId = userId;

            // Check if next message is from the same user
            const isLastInGroup =
                idx === notes.length - 1 ||
                notes[idx + 1].creator.id !== userId;

            // Calculate position class
            let positionClass;

            if (isUserChange && isLastInGroup) {
                positionClass = "standalone";
            } else if (isUserChange) {
                positionClass = "first-in-group";
            } else if (isLastInGroup) {
                positionClass = "last-in-group";
            } else {
                positionClass = "middle-in-group";
            }

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
    }, [notes, chip]);
};

export default useNotes;
