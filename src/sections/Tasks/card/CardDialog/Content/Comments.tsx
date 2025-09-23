import { FC } from "react";
import NoteSection from "@/ui/Note/Section";
import isFalsy from "@/utils/isFalsy";

interface CommentsProps {
    cardId?: number;
}

const Comments: FC<CommentsProps> = ({ cardId }) => {
    if (isFalsy(cardId)) return null;
    return <NoteSection resource="ticket" resourceId={cardId} />;
};

export default Comments;
