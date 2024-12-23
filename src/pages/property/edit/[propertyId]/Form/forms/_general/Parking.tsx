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
import { KeyValue } from "src/types/KeyValue";
import uuidv4 from "src/utils/uuidv4";

interface ParkingProps {
    options: KeyValue[];
    index: number;
    onRemove: () => void;
}

const Parking = ({ options, index, onRemove }: ParkingProps) => {
    const { t } = useTranslation();
    return (
        <Stack direction="row" spacing={1.5}>
            <Select
                fullWidth
                name={`details.parkings[${index}].parkingType`}
                label={t("Parking Type")}
                options={options}
            />

            <RHFOnlyNumbers
                label={t("Spots")}
                name={`details.parkings[${index}].spots`}
            />

            <IconButton onClick={onRemove}>
                <Cancel />
            </IconButton>
        </Stack>
    );
};

const useEnums = () => {
    const data = useGlobals();
    const details = useMemo(
        () => data?.property?.details as IGlobalPropertyDetails,
        [data]
    );
    const parkingType = useMemo(
        () => details?.parkingType || [],
        [details?.parkingType]
    );
    return { parkingType };
};

const ParkingSection: React.FC = () => {
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
                    parkingType: "",
                    spots: 0,
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

    const PARKINGS = useMemo(
        () =>
            parkings?.map((b, i) => (
                <Parking
                    key={uuidv4()}
                    index={i}
                    options={parkingType}
                    onRemove={() => removeParking(i)}
                />
            )),
        [parkings, removeParking]
    );

    const lastIndex = useMemo(
        () => (parkings.length > 0 ? parkings.length - 1 : 0),
        [parkings.length]
    );
    const lastParkingType = watch(`details.parkings[${lastIndex}].parkingType`);
    const lastSpots = watch(`details.parkings[${lastIndex}].spots`);
    const disabled = useMemo(
        () => parkings.length > 0 && (!lastParkingType || !lastSpots),
        [parkings.length, lastParkingType, lastSpots]
    );

    return (
        <Panel
            label={t("Parkings")}
            endNode={
                <IconButton disabled={disabled} onClick={addParking}>
                    <AddCircle />
                </IconButton>
            }
        >
            {PARKINGS}
        </Panel>
    );
};

export default ParkingSection;
