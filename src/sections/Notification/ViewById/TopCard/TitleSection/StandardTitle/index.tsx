import { Stack, Typography } from "@mui/material";
import { SpaceBetween } from "@/components/styled";
import dynamic from "next/dynamic";
import { useTranslation } from "react-i18next";
import { FC } from "react";
import { NotificationType } from "@/types/notification";
import PrintButton from "./Controls/Print";
import { NON_PRINTABLE } from "../../../styles";
const StayUpdatedButtons = dynamic(() => import("./Controls/StayUpdated"));
const CreateCustomerButton = dynamic(() => import("./Controls/CreateCustomer"));
const CreateTaskButton = dynamic(() => import("./Controls/CreateTask"));

interface StandardTitleProps {
    type: NotificationType;
    onPrint: VoidFunction;
}

const StandardTitle: FC<StandardTitleProps> = ({ type, onPrint }) => {
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

    const stayUpdatedButtons = type === "STAY_UPDATED";

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

            <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                sx={NON_PRINTABLE}
            >
                <PrintButton onClick={onPrint} />
                {stayUpdatedButtons ? <StayUpdatedButtons /> : null}
                {type === "TOUR" ? <CreateCustomerButton /> : null}
                <CreateTaskButton />
            </Stack>
        </SpaceBetween>
    );
};

export default StandardTitle;
