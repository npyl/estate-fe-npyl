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
import Divider from "@mui/material/Divider";
import { RHFTextField } from "@/components/hook-form";
import WithCalendar from "./_WithCalendar";
const Comments = dynamic(() => import("./Comments"));
import MiscInfo from "./MiscInfo";
import dynamic from "next/dynamic";

// -----------------------------------------------------------------

interface ContentProps {
    columnId?: number;
    createdAt?: string;
    updatedAt?: string;
}

const Content: FC<ContentProps> = ({ columnId, createdAt, updatedAt }) => {
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
            <PropertySelect />
            <CustomerSelect />
            <AssigneeSelect />
            <Stack alignItems="center">
                <PriorityButtonGroup />
            </Stack>
            <Comments />
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
