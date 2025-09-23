import Normal from "./Normal";
import RHFNoteSection from "@/ui/Note/RHFSection";

interface NotesSectionProps {
    isEditMode: boolean;
}

const NotesSection = ({ isEditMode }: NotesSectionProps) => {
    return isEditMode ? <Normal /> : <RHFNoteSection name="notes" chip />;
};

export default NotesSection;
