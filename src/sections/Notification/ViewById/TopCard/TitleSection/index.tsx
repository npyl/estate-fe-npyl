import { FC } from "react";
import { NotificationType } from "@/types/notification";
import dynamic from "next/dynamic";
const StandardTitle = dynamic(() => import("./StandardTitle"));
const AgreementTitle = dynamic(() => import("./AgreementTitle"));

interface TitleSectionProps {
    type: NotificationType;
}

const TitleSection: FC<TitleSectionProps> = ({ type }) => (
    <>
        {type === "AGREEMENT" ? <AgreementTitle /> : null}
        {type !== "AGREEMENT" ? <StandardTitle type={type} /> : null}
    </>
);

export default TitleSection;
