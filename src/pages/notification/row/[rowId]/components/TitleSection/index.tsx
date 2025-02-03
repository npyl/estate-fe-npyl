import { FC } from "react";
import { Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import {
    ContactNotificationExtended,
    NotificationType,
} from "@/types/notification";
import { SpaceBetween } from "@/components/styled";
import dynamic from "next/dynamic";
const AgreementTitle = dynamic(() => import("./AgreementTitle"));
const CreateCustomerButton = dynamic(() => import("./CreateCustomerButton"));
const CreateTaskButton = dynamic(() => import("./CreateTaskButton"));

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
}) => {
    const { t } = useTranslation();

    const getTitle = () => {
        switch (type) {
            case "TOUR":
                return t("Tour request details");
            case "REVIEW":
                return t("Review Details");
            case "LISTING":
                return t("Listing details");
            case "WORK_FOR_US":
                return t("Work application details");
            default:
                return "";
        }
    };

    return (
        <>
            {type === "AGREEMENT" ? (
                <AgreementTitle
                    agreementVariant={agreementVariant}
                    isAgreementActive={isAgreementActive}
                />
            ) : null}

            {type !== "AGREEMENT" ? (
                <SpaceBetween
                    borderBottom="1px solid lightgray"
                    pb={1}
                    mb={1}
                    alignItems="center"
                >
                    <Typography variant="h5" width={1} gutterBottom>
                        {getTitle()}
                    </Typography>

                    <Stack direction="row" spacing={1} alignItems="center">
                        {type === "TOUR" ? (
                            <CreateCustomerButton data={data} />
                        ) : null}

                        <CreateTaskButton data={data} />
                    </Stack>
                </SpaceBetween>
            ) : null}
        </>
    );
};

export default TitleSection;
