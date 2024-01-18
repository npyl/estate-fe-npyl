import { IconButton, Stack } from "@mui/material";
import { AddCircle, Cancel } from "@mui/icons-material";
import * as React from "react";
import { useGlobals } from "src/hooks/useGlobals";
import { IGlobalPropertyDetails } from "src/types/global";
import { useTranslation } from "react-i18next";
import { useFormContext } from "react-hook-form";
import Panel from "src/components/Panel";
import { IPropertyDetailsBalconyPOST } from "src/types/details";
import { useCallback, useMemo } from "react";
import { RHFOnlyNumbers, Select } from "src/components/hook-form";

const useEnums = () => {
    const data = useGlobals();
    const details = useMemo(
        () => data?.property?.details as IGlobalPropertyDetails,
        [data]
    );
    const balconySide = useMemo(
        () => details?.balconySide,
        [details?.balconySide]
    );
    return { balconySide };
};

const BalconiesSection: React.FC = () => {
    const { t } = useTranslation();
    const { watch, setValue } = useFormContext();
    const { balconySide } = useEnums();

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
                <Stack key={i} direction="row" spacing={1.5}>
                    <Select
                        fullWidth
                        name={`details.balconies[${i}].side`}
                        label={t("Side")}
                        options={balconySide}
                    />

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
