import Stack from "@mui/material/Stack";
import { useTranslation } from "react-i18next";
import PriorityButtonGroup from "./Priority";
import { FC } from "react";
import RHFMultilineTextField from "@/components/hook-form/RHFTextFieldMultiline";
import Buttons from "./Buttons";
import Divider from "@mui/material/Divider";
import { RHFTextField } from "@/components/hook-form";
import WithCalendar from "./_WithCalendar";
import MiscInfo from "./MiscInfo";
import dynamic from "next/dynamic";
import PropertiesAutocomplete from "./Autocompletes/Properties";
import CustomerSelect from "./Autocompletes/Customer";
import AssigneeSelect from "./Autocompletes/Assignee";
import { AttachmentsProvider } from "./AttachmentsContext";
const Attachments = dynamic(() => import("./Attachments"));
const AssigneeHistory = dynamic(() => import("./AssigneeHistory"));
const Comments = dynamic(() => import("./Comments"));
const Labels = dynamic(() => import("./Labels"));

// -----------------------------------------------------------------

interface ContentProps {
    cardId?: number;
    createdAt?: string;
    updatedAt?: string;
    // ...
    haveEvent: boolean;
}

const Content: FC<ContentProps> = ({
    cardId,
    createdAt,
    updatedAt,
    // ...
    haveEvent,
}) => {
    const { t } = useTranslation();

    const isEdit = Boolean(cardId);

    return (
        <Stack spacing={2} mt={3}>
            {/* ------------------------ */}
            <AttachmentsProvider>
                <Buttons cardId={cardId} />
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

            <Labels cardId={cardId} />

            <Comments cardId={cardId} />

            {createdAt || updatedAt ? (
                <>
                    <Divider />
                    {isEdit ? <AssigneeHistory cardId={cardId!} /> : null}
                    <MiscInfo createdAt={createdAt} updatedAt={updatedAt} />
                </>
            ) : null}
        </Stack>
    );
};

export default Content;
