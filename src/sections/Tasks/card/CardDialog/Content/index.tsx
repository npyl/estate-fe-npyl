import Stack from "@mui/material/Stack";
import { useTranslation } from "react-i18next";
import Reporter from "./Reporter";
import PropertySelect from "./Property";
import CustomerSelect from "./Customer";
import AssigneeSelect from "./Assignee";
import PriorityButtonGroup from "./Priority";
import { FC } from "react";
import RHFMultilineTextField from "@/components/hook-form/RHFTextFieldMultiline";
import Buttons from "./Buttons";
import Attachments from "./Attachments";

// -----------------------------------------------------------------

interface ContentProps {
    columnId?: number;
}

const Content: FC<ContentProps> = ({ columnId }) => {
    const { t } = useTranslation();

    return (
        <Stack spacing={2}>
            {/* ------------------------ */}
            <Buttons columnId={columnId} />
            <Attachments />
            {/* ------------------------ */}

            {/* <DatePickets /> */}

            <RHFMultilineTextField
                name="description"
                label={t("Description")}
                multiline
                rows={5}
            />
            <PropertySelect />
            <CustomerSelect />
            <AssigneeSelect />
            <Stack alignItems="center">
                <PriorityButtonGroup />
            </Stack>
            <Reporter />
        </Stack>
    );
};

export default Content;
