import { IconButton, Stack } from "@mui/material";
import { AddCircle, Cancel } from "@mui/icons-material";
import * as React from "react";
import { useGlobals } from "@/sections/useGlobals";
import { IGlobalPropertyDetails } from "src/types/global";
import { useTranslation } from "react-i18next";
import { useFieldArray, useWatch } from "react-hook-form";
import Panel from "@/components/Panel";
import { useCallback, useMemo } from "react";
import { RHFOnlyNumbers, Select } from "@/components/hook-form";
import { KeyValue } from "@/types/KeyValue";
import { IPropertyYup } from "../../../usePropertyForm";
import {
    ADD_PARKING_BUTTON_TESTID,
    getParkingTypeSelectTestId,
    getSpotsTestId,
} from "./constants";

// ---------------------------------------------------------------------

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
                data-testid={getParkingTypeSelectTestId(index)}
                fullWidth
                name={`details.parkings[${index}].parkingType`}
                label={t("Parking Type")}
                options={options}
            />

            <RHFOnlyNumbers
                data-testid={getSpotsTestId(index)}
                label={t("Spots")}
                name={`details.parkings[${index}].spots`}
            />

            <IconButton onClick={onRemove}>
                <Cancel />
            </IconButton>
        </Stack>
    );
};

// ---------------------------------------------------------------------

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

// ---------------------------------------------------------------------

const nameKey = "details.parkings";

const ParkingSection: React.FC = () => {
    const { t } = useTranslation();

    const { parkingType } = useEnums();

    const { fields, append, remove } = useFieldArray<IPropertyYup>({
        name: nameKey,
    });

    const addParking = useCallback(
        () =>
            append({
                parkingType: "",
                spots: 0,
            }),
        []
    );

    const PARKINGS = useMemo(
        () =>
            fields?.map((b, i) => (
                <Parking
                    key={b.id}
                    index={i}
                    options={parkingType}
                    onRemove={() => remove(i)}
                />
            )),
        [fields]
    );

    const lastIndex = fields.length > 0 ? fields.length - 1 : 0;

    const lastParkingType = useWatch({
        name: `details.parkings[${lastIndex}].parkingType`,
    });
    const lastSpots = useWatch({
        name: `details.parkings[${lastIndex}].spots`,
    });

    const disabled = fields.length > 0 && (!lastParkingType || !lastSpots);

    return (
        <Panel
            label={t("Parkings")}
            endNode={
                <IconButton
                    data-testid={ADD_PARKING_BUTTON_TESTID}
                    disabled={disabled}
                    onClick={addParking}
                >
                    <AddCircle />
                </IconButton>
            }
        >
            {PARKINGS}
        </Panel>
    );
};

export default ParkingSection;
