const LabelCreate = dynamic(() => import("@/ui/LabelCreate"));
const RHFLabelCreate = dynamic(() => import("./RHFCreate"));
import dynamic from "next/dynamic";
import { FC } from "react";

interface LabelsProps {
    cardId?: number;
}

const Labels: FC<LabelsProps> = ({ cardId }) => {
    if (cardId) {
        return <LabelCreate variant="ticket" resourceId={cardId} />;
    }

    return <RHFLabelCreate />;
};

export default Labels;
