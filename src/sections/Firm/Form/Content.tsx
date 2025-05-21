import RHFTextField from "@/components/hook-form/RHFTextField";
import RHFCustomerMultiple from "@/sections/_Autocompletes/RHFCustomerMultiple";
import Stack from "@mui/material/Stack";
import { FC } from "react";
import { useTranslation } from "react-i18next";

interface ContentProps {
    createAssign?: boolean; // true when opened from inside customer for create-assign
}

const Content: FC<ContentProps> = ({ createAssign }) => {
    const { t } = useTranslation();

    return (
        <Stack height={1} p={2}>
            <RHFTextField name="name" label={t("Label")} />
            {createAssign ? null : <RHFCustomerMultiple name="customers" />}
        </Stack>
    );
};

export default Content;
