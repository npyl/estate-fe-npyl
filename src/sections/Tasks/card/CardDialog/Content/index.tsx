import Stack from "@mui/material/Stack";
import { useTranslation } from "react-i18next";
import Reporter from "./Reporter";
import PropertySelect from "./Property";
import CustomerSelect from "./Customer";
import AssigneeSelect from "./Assignee";
import PriorityButtonGroup from "./Priority";
import { FC, ReactNode } from "react";
import RHFMultilineTextField from "@/components/hook-form/RHFTextFieldMultiline";
import Buttons from "./Buttons";
import Attachments from "./Attachments";
import Divider from "@mui/material/Divider";

// -----------------------------------------------------------------

interface ContentProps {
    columnId?: number;
    DatePicker: ReactNode;
}

const Content: FC<ContentProps> = ({ columnId, DatePicker }) => {
    const { t } = useTranslation();

    return (
        <Stack spacing={2} mt={3}>
            {/* ------------------------ */}
            <Buttons columnId={columnId} />
            <Attachments />
            {/* ------------------------ */}

            <Divider />
            {DatePicker}
            <Divider />

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
