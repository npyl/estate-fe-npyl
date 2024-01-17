import { MenuItem, IconButton, Stack } from "@mui/material";
import { AddCircle, Cancel } from "@mui/icons-material";
import * as React from "react";
import { useGlobals } from "src/hooks/useGlobals";
import { IGlobalPropertyDetails } from "src/types/global";
import { useTranslation } from "react-i18next";
import { useFormContext } from "react-hook-form";
import Panel from "src/components/Panel";
import { IPropertyDetailsParkingPOST } from "src/types/details";
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

const Parking: React.FC = () => {
    const { t } = useTranslation();
    const { watch, setValue } = useFormContext();
    const { details } = useEnums();

    const parkings =
        (watch("details.parkings") as IPropertyDetailsParkingPOST[]) || [];

    const addParking = useCallback(
        () =>
            setValue("details.parkings", [
                ...parkings,
                {
                    side: "",
                    area: 0,
                },
            ]),
        [parkings]
    );

    const removeParking = useCallback(
        (index: number) =>
            setValue(
                "details.parkings",
                parkings?.filter((b, i) => i !== index)
            ),
        [parkings]
    );

    return (
        <Panel
            label={t("Balconies")}
            endNode={
                <IconButton onClick={addParking}>
                    <AddCircle />
                </IconButton>
            }
        >
            {parkings?.map((b, i) => (
                <Stack direction="row" spacing={1.5} px={1.5}>
                    <RHFTextField
                        fullWidth
                        select
                        name={`details.parkings[${i}].parkingType`}
                        label={t("Parking Type")}
                    >
                        {details?.parkingType?.map(({ key, value }) => (
                            <MenuItem key={key} value={key}>
                                {value}
                            </MenuItem>
                        ))}
                    </RHFTextField>

                    <RHFOnlyNumbers
                        label={t("Spots")}
                        name={`details.parkings[${i}].spots`}
                    />

                    <IconButton onClick={() => removeParking(i)}>
                        <Cancel />
                    </IconButton>
                </Stack>
            ))}
        </Panel>
    );
};
export default Parking;
