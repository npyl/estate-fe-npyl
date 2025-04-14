import { useTranslation } from "react-i18next";
import { useCallback } from "react";
import PropertiesAutocompleteMultiple from "@/sections/_Autocompletes/RHFCodeMultiple";
import { Box, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { ICreateOrUpdateTaskReq } from "@/types/tasks";
import { useGetOwnersMutation } from "@/services/properties";
import getDiffedIds from "./getDiffedIds";

const PropertiesAutocomplete = () => {
    const { t } = useTranslation();

    const { getValues, setValue } = useFormContext<ICreateOrUpdateTaskReq>();
    const [get] = useGetOwnersMutation();
    const onPropertiesChange = useCallback(
        async (_: any, newIds: number[]) => {
            const oldIds = getValues("properties") || [];
            const diffed = getDiffedIds(oldIds, newIds);

            const res = await get(diffed);
            if ("error" in res) return;

            const old = getValues("customers") || [];
            const dataIds = res.data?.map(({ id }) => id) || [];

            setValue("customers", [...old, ...dataIds]);
        },
        [getValues]
    );

    return (
        <Box>
            <Typography fontWeight={"bold"} pb={0.5}>
                {t("Details")}{" "}
            </Typography>
            <PropertiesAutocompleteMultiple
                name="properties"
                label={t<string>("Properties")}
                onChange={onPropertiesChange}
            />
        </Box>
    );
};

export default PropertiesAutocomplete;
