import Stack from "@mui/material/Stack";
import { useTranslation } from "react-i18next";
import { FC, useCallback } from "react";
import Buttons from "./Buttons";
import Divider from "@mui/material/Divider";
import { RHFTextField } from "@/components/hook-form";
import WithCalendar from "./_WithCalendar";
import MiscInfo from "./MiscInfo";
import dynamic from "next/dynamic";
import PropertiesAutocompleteMultiple from "@/sections/_Autocompletes/RHFCodeMultiple";
import CustomerAutocompleteMultiple from "@/sections/_Autocompletes/RHFCustomerMultiple";
import AssigneeSelect from "./Autocompletes/Assignee";
import RHFEditor from "@/components/hook-form/RHFEditor";
const Attachments = dynamic(() => import("./Attachments"));
const AssigneeHistory = dynamic(() => import("./AssigneeHistory"));
const Comments = dynamic(() => import("./Comments"));
const Labels = dynamic(() => import("./Labels"));

// -----------------------------------------------------------------

const CustomerAutocomplete = () => {
    const { t } = useTranslation();

    const onCustomersChange = useCallback((v: number[]) => {}, []);

    return (
        <CustomerAutocompleteMultiple
            label={t("Customers")}
            name="customers"
            onChange={onCustomersChange}
        />
    );
};

const PropertiesAutocomplete = () => {
    const { t } = useTranslation();

    const onPropertiesChange = useCallback((_: any, ids: number[]) => {}, []);

    return (
        <PropertiesAutocompleteMultiple
            name="properties"
            label={t<string>("Properties")}
            onChange={onPropertiesChange}
        />
    );
};

// -----------------------------------------------------------------

interface ContentProps {
    cardId?: number;
    createdAt?: string;
    updatedAt?: string;
    reporter?: {
        firstName: string;
        lastName: string;
        avatar?: string;
    };
}

const Content: FC<ContentProps> = ({
    cardId,
    createdAt,
    updatedAt,
    reporter,
}) => {
    const { t } = useTranslation();

    const isEdit = Boolean(cardId);
    return (
        <Stack spacing={2} mt={3}>
            {/* ------------------------ */}
            <RHFTextField name="name" label={t("Title")} />

            <Buttons />
            {/* ------------------------ */}

            <Attachments />
            <WithCalendar />

            <RHFEditor name="description" rows={5} />

            <PropertiesAutocomplete />
            <CustomerAutocomplete />
            <AssigneeSelect />

            <Labels cardId={cardId} />

            <Comments cardId={cardId} />

            {createdAt || updatedAt ? (
                <>
                    <Divider />
                    {isEdit ? <AssigneeHistory cardId={cardId!} /> : null}
                    <MiscInfo
                        createdAt={createdAt}
                        updatedAt={updatedAt}
                        reporter={reporter} //not working yet
                    />
                </>
            ) : null}
        </Stack>
    );
};

export default Content;
