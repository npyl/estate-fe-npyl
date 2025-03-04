import { IconButton, Stack } from "@mui/material";
import { AddCircle, Cancel } from "@mui/icons-material";
import { useGlobals } from "@/hooks/useGlobals";
import { IGlobalPropertyDetails } from "@/types/global";
import { useTranslation } from "react-i18next";
import { useFieldArray, useWatch } from "react-hook-form";
import Panel from "@/components/Panel";
import { useCallback, useMemo } from "react";
import { RHFOnlyNumbers, Select } from "@/components/hook-form";
import { KeyValue } from "@/types/KeyValue";
import { IPropertyYup } from "../../hook";

// --------------------------------------------------------------------------

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

// --------------------------------------------------------------------------

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

// --------------------------------------------------------------------------

const nameKey = "details.balconies";

const BalconiesSection = () => {
    const { t } = useTranslation();

    const { fields, append, remove } = useFieldArray<IPropertyYup>({
        name: nameKey,
    });

    const { balconySide } = useEnums();

    const addBalcony = useCallback(
        () =>
            append({
                side: "",
                area: 0,
            }),
        []
    );

    const BALCONIES = useMemo(
        () =>
            fields?.map((b, i) => (
                <Balcony
                    key={b.id}
                    index={i}
                    options={balconySide}
                    onRemove={() => remove(i)}
                />
            )),
        [fields]
    );

    const lastIndex = fields.length > 0 ? fields.length - 1 : 0;

    const lastArea = useWatch({ name: `details.balconies[${lastIndex}].area` });
    const lastSide = useWatch({ name: `details.balconies[${lastIndex}].side` });
    const disabled = fields.length > 0 && (!lastArea || !lastSide);

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
