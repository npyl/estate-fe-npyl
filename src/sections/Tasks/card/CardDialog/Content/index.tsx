import Stack from "@mui/material/Stack";
import { useTranslation } from "react-i18next";
import PriorityButtonGroup from "./Priority";
import { FC } from "react";
import RHFMultilineTextField from "@/components/hook-form/RHFTextFieldMultiline";
import Buttons from "./Buttons";
const Attachments = dynamic(() => import("./Attachments"));
import Divider from "@mui/material/Divider";
import { RHFTextField } from "@/components/hook-form";
import WithCalendar from "./_WithCalendar";
import MiscInfo from "./MiscInfo";
import dynamic from "next/dynamic";
import PropertiesAutocomplete from "./Autocompletes/Properties";
import CustomerSelect from "./Autocompletes/Customer";
import AssigneeSelect from "./Autocompletes/Assignee";
import { AttachmentsProvider } from "./AttachmentsContext";
const Comments = dynamic(() => import("./Comments"));

// -----------------------------------------------------------------

interface ContentProps {
    cardId?: number;
    columnId?: number;
    createdAt?: string;
    updatedAt?: string;
    // ...
    haveEvent: boolean;
}

const Content: FC<ContentProps> = ({
    cardId,
    columnId,
    createdAt,
    updatedAt,
    // ...
    haveEvent,
}) => {
    const { t } = useTranslation();

    return (
        <Stack spacing={2} mt={3}>
            {/* ------------------------ */}
            <AttachmentsProvider>
                <Buttons columnId={columnId} cardId={cardId} />
                <Attachments cardId={cardId} />
            </AttachmentsProvider>
            {/* ------------------------ */}

            <Divider />
            <WithCalendar edit={haveEvent} />
            <Divider />

            <RHFTextField name="name" label={t("Title")} />
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
