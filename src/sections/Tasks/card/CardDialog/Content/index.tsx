import Stack from "@mui/material/Stack";
import { useTranslation } from "react-i18next";
import Reporter from "./Reporter";
import PriorityButtonGroup from "./Priority";
import { FC } from "react";
import RHFMultilineTextField from "@/components/hook-form/RHFTextFieldMultiline";
import Buttons from "./Buttons";
import Attachments from "./Attachments";
import Divider from "@mui/material/Divider";
import { RHFTextField } from "@/components/hook-form";
import WithCalendar from "./_WithCalendar";
import MiscInfo from "./MiscInfo";
import dynamic from "next/dynamic";
import PropertiesAutocomplete from "./Autocompletes/Properties";
import CustomerSelect from "./Autocompletes/Customer";
import AssigneeSelect from "./Autocompletes/Assignee";
const Comments = dynamic(() => import("./Comments"));

// -----------------------------------------------------------------

interface ContentProps {
    cardId?: number;
    columnId?: number;
    createdAt?: string;
    updatedAt?: string;
}

const Content: FC<ContentProps> = ({
    cardId,
    columnId,
    createdAt,
    updatedAt,
}) => {
    const { t } = useTranslation();

    return (
        <Stack spacing={2} mt={3}>
            {/* ------------------------ */}
            <Buttons columnId={columnId} />
            <Attachments />
            {/* ------------------------ */}

            <Divider />
            <WithCalendar />
            <Divider />

            <RHFTextField name="name" label={t("Name")} />
            <RHFMultilineTextField
                name="description"
                label={t("Description")}
                multiline
                rows={5}
            />

            <PropertiesAutocomplete />
            <CustomerSelect />
            <AssigneeSelect />

            <Stack alignItems="center">
                <PriorityButtonGroup />
            </Stack>

            <Comments cardId={cardId} />

            <Reporter />

            {createdAt || updatedAt ? (
                <>
                    <Divider />
                    <MiscInfo createdAt={createdAt} updatedAt={updatedAt} />
                </>
            ) : null}
        </Stack>
    );
};

export default Content;
