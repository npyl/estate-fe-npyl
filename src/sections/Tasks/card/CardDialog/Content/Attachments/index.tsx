import { FC } from "react";
import { AttachmentsProvider } from "./Context";
import AttachmentsButton from "./Button";
import Attachments from "./Attachments";

interface AttachmentsProps {
    cardId?: number;
}

const AttachmentsSection: FC<AttachmentsProps> = ({ cardId }) => (
    <AttachmentsProvider>
        <AttachmentsButton cardId={cardId} />
        <Attachments cardId={cardId} />
    </AttachmentsProvider>
);

export default AttachmentsSection;
