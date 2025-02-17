import { FC } from "react";
import { NotificationType } from "@/types/notification";
import dynamic from "next/dynamic";
const StandardTitle = dynamic(() => import("./StandardTitle"));
const AgreementTitle = dynamic(() => import("./AgreementTitle"));

interface TitleSectionProps {
    type: NotificationType;
    onPrint: VoidFunction;
}

const TitleSection: FC<TitleSectionProps> = ({ type, onPrint }) => (
    <>
        {type === "AGREEMENT" ? <AgreementTitle /> : null}
        {type !== "AGREEMENT" ? (
            <StandardTitle type={type} onPrint={onPrint} />
        ) : null}
    </>
);

export default TitleSection;
