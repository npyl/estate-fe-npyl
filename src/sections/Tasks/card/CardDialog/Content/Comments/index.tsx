import { FC } from "react";
import NoteSection from "@/ui/Note/Section";

interface CommentsProps {
    cardId?: number;
}

const Comments: FC<CommentsProps> = ({ cardId }) => (
    <NoteSection resource="ticket" resourceId={cardId} />
);

export default Comments;
