import { Stack, Typography } from "@mui/material";
import { SpaceBetween } from "@/components/styled";
import dynamic from "next/dynamic";
import { useTranslation } from "react-i18next";
import { FC } from "react";
import {
    ContactNotificationExtended,
    NotificationType,
} from "@/types/notification";
const CustomerLinkWrap = dynamic(() => import("./CustomerLinkWrap"));
const StayUpdatedButtons = dynamic(() => import("./StayUpdatedButtons"));
const CreateCustomerButton = dynamic(() => import("./CreateCustomerButton"));
const CreateTaskButton = dynamic(() => import("./CreateTaskButton"));

interface StandardTitleProps {
    type: NotificationType;
    data: ContactNotificationExtended;
}

const StandardTitle: FC<StandardTitleProps> = ({ type, data }) => {
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
            case "STAY_UPDATED":
                return t("Stay Updated");
            default:
                return "";
        }
    };

    // INFO: make sure we only show the Create User button from stay updated when the user is not already created!
    const isRegistered = data?.stayUpdatedDetails?.clientRegistered;
    const stayUpdatedButtons = type === "STAY_UPDATED" && !isRegistered;

    const email = data?.stayUpdatedDetails?.email || "";

    return (
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
                {isRegistered ? <CustomerLinkWrap email={email} /> : null}
                {stayUpdatedButtons ? <StayUpdatedButtons /> : null}

                {type === "TOUR" ? <CreateCustomerButton data={data} /> : null}

                <CreateTaskButton data={data} />
            </Stack>
        </SpaceBetween>
    );
};

export default StandardTitle;
