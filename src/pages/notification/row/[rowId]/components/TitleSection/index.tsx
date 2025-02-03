import { FC } from "react";
import {
    ContactNotificationExtended,
    NotificationType,
} from "@/types/notification";
import dynamic from "next/dynamic";
const StandardTitle = dynamic(() => import("./StandardTitle"));
const AgreementTitle = dynamic(() => import("./AgreementTitle"));

interface TitleSectionProps {
    type: NotificationType;
    variant?: string;
    agreementVariant?: string;
    isAgreementActive?: boolean;
    data: ContactNotificationExtended;
}

const TitleSection: FC<TitleSectionProps> = ({
    type,
    agreementVariant,
    isAgreementActive,
    data,
}) => (
    <>
        {type === "AGREEMENT" ? (
            <AgreementTitle
                agreementVariant={agreementVariant}
                isAgreementActive={isAgreementActive}
            />
        ) : null}

        {type !== "AGREEMENT" ? (
            <StandardTitle type={type} data={data} />
        ) : null}
    </>
);

export default TitleSection;
