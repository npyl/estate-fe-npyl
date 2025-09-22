const LabelSection = dynamic(() => import("@/ui/LabelSection"));
const RHFLabelSection = dynamic(() => import("./RHFCreate"));
import dynamic from "next/dynamic";
import { FC } from "react";

interface LabelsProps {
    cardId?: number;
}

const Labels: FC<LabelsProps> = ({ cardId }) => {
    if (cardId) {
        return <LabelSection variant="ticket" resourceId={cardId} />;
    }

    return <RHFLabelSection />;
};

export default Labels;
