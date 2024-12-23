import Normal from "./Normal";
import RHF from "./RHF";

interface NotesSectionProps {
    isEditMode: boolean;
}

const NotesSection = ({ isEditMode }: NotesSectionProps) => {
    return isEditMode ? <Normal /> : <RHF />;
};

export default NotesSection;
