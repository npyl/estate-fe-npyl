import { FC } from "react";
import dynamic from "next/dynamic";
const View = dynamic(() => import("./view"));
const Create = dynamic(() => import("./create"));

interface AttachmentsProps {
    cardId?: number;
}

const Attachments: FC<AttachmentsProps> = ({ cardId }) => {
    if (cardId) {
        return <View cardId={cardId} />;
    }

    return <Create />;
};

export default Attachments;
