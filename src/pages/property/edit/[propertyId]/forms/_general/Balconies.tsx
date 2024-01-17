import { MenuItem, IconButton, Stack } from "@mui/material";
import { AddCircle, Cancel } from "@mui/icons-material";
import * as React from "react";
import { useGlobals } from "src/hooks/useGlobals";
import { IGlobalPropertyDetails } from "src/types/global";
import { useTranslation } from "react-i18next";
import { useFormContext } from "react-hook-form";
import Panel from "src/components/Panel";
import { IPropertyDetailsBalconyPOST } from "src/types/details";
import { useCallback, useMemo } from "react";
import { RHFOnlyNumbers, RHFTextField } from "src/components/hook-form";

const useEnums = () => {
    const data = useGlobals();
    const details = useMemo(
        () => (data?.property?.details as IGlobalPropertyDetails) || [],
        [data]
    );
    return { details };
};

const BalconiesSection: React.FC = () => {
    const { t } = useTranslation();
    const { watch, setValue } = useFormContext();
    const { details } = useEnums();

    const balconies =
        (watch("details.balconies") as IPropertyDetailsBalconyPOST[]) || [];

    const addBalcony = useCallback(
        () =>
            setValue("details.balconies", [
                ...balconies,
                {
                    side: "",
                    area: 0,
                },
            ]),
        [balconies]
    );

    const removeBalcony = useCallback(
        (index: number) =>
            setValue(
                "details.balconies",
                balconies?.filter((b, i) => i !== index)
            ),
        [balconies]
    );

    return (
        <Panel
            label={t("Balconies")}
            endNode={
                <IconButton onClick={addBalcony}>
                    <AddCircle />
                </IconButton>
            }
        >
            {balconies?.map((b, i) => (
                <Stack direction="row" spacing={1.5} px={1.5}>
                    <RHFTextField
                        fullWidth
                        select
                        name={`details.balconies[${i}].side`}
                        label={t("Side")}
                    >
                        {details?.balconySide?.map(({ key, value }) => (
                            <MenuItem key={key} value={key}>
                                {value}
                            </MenuItem>
                        ))}
                    </RHFTextField>

                    <RHFOnlyNumbers
                        label={t("Area")}
                        name={`details.balconies[${i}].area`}
                    />

                    <IconButton onClick={() => removeBalcony(i)}>
                        <Cancel />
                    </IconButton>
                </Stack>
            ))}
        </Panel>
    );
};
export default BalconiesSection;
