import { IconButton, Stack } from "@mui/material";
import { AddCircle, Cancel } from "@mui/icons-material";
import * as React from "react";
import { useGlobals } from "src/hooks/useGlobals";
import { IGlobalPropertyDetails } from "src/types/global";
import { useTranslation } from "react-i18next";
import { useFormContext } from "react-hook-form";
import Panel from "src/components/Panel";
import { IPropertyDetailsParkingPOST } from "src/types/details";
import { useCallback, useMemo } from "react";
import { RHFOnlyNumbers, Select } from "src/components/hook-form";

const useEnums = () => {
    const data = useGlobals();
    const details = useMemo(
        () => data?.property?.details as IGlobalPropertyDetails,
        [data]
    );
    const parkingType = useMemo(
        () => details?.parkingType,
        [details?.parkingType]
    );
    return { parkingType };
};

const Parking: React.FC = () => {
    const { t } = useTranslation();
    const { watch, setValue } = useFormContext();
    const { parkingType } = useEnums();

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
                <Stack key={i} direction="row" spacing={1.5} px={1.5}>
                    <Select
                        fullWidth
                        name={`details.parkings[${i}].parkingType`}
                        label={t("Parking Type")}
                        options={parkingType}
                    />

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
