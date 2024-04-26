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
import { KeyValue } from "src/types/KeyValue";
import uuidv4 from "src/utils/uuidv4";

interface BalconyProps {
    options: KeyValue[];
    index: number;
    onRemove: () => void;
}

const Balcony = ({ options, index, onRemove }: BalconyProps) => {
    const { t } = useTranslation();
    return (
        <Stack direction="row" spacing={1.5}>
            <Select
                fullWidth
                name={`details.balconies[${index}].side`}
                label={t("Side")}
                options={options}
            />

            <RHFOnlyNumbers
                label={t("Living Space")}
                name={`details.balconies[${index}].area`}
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
    const balconySide = useMemo(
        () => details?.balconySide || [],
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

    const BALCONIES = useMemo(
        () =>
            balconies?.map((b, i) => (
                <Balcony
                    key={uuidv4()}
                    index={i}
                    options={balconySide}
                    onRemove={() => removeBalcony(i)}
                />
            )),
        [balconies, removeBalcony]
    );

    const lastIndex = useMemo(
        () => (balconies.length > 0 ? balconies.length - 1 : 0),
        [balconies.length]
    );
    const lastArea = watch(`details.balconies[${lastIndex}].area`);
    const lastSide = watch(`details.balconies[${lastIndex}].side`);
    const disabled = useMemo(
        () => balconies.length > 0 && (!lastArea || !lastSide),
        [balconies.length, lastArea, lastSide]
    );

    return (
        <Panel
            label={t("Balconies")}
            endNode={
                <IconButton disabled={disabled} onClick={addBalcony}>
                    <AddCircle />
                </IconButton>
            }
        >
            {BALCONIES}
        </Panel>
    );
};
export default BalconiesSection;
