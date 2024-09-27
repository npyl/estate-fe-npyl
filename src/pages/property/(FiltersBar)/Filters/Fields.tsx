import FieldSelect from "@/components/Filters/FieldSelect";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import {
    resetFrameType,
    resetFurnished,
    resetHeatingType,
    toggleFrameType,
    toggleFurnished,
    toggleHeatingType,
    selectFrameType,
    selectFurnished,
    // ...
    selectHeatingType,
} from "src/slices/filters";

import { KeyValue } from "src/types/KeyValue";
import { TranslationType } from "src/types/translation";
import useEnums from "./useEnums";

const getFEILDS = (
    t: TranslationType,
    frameType: string[],
    furnished: string[],
    heatingType: string[],
    frameTypeEnum: KeyValue[],
    furnishedEnum: KeyValue[],
    heatingTypeEnum: KeyValue[]
) => [
    {
        id: "frameType",
        values: frameType,
        title: t("Frame Type"),
        options: frameTypeEnum,
        onClick: toggleFrameType,
        onReset: resetFrameType,
    },
    {
        id: "Furnished",
        values: furnished,
        title: t("Furnished"),
        options: furnishedEnum,
        onClick: toggleFurnished,
        onReset: resetFurnished,
    },
    {
        id: "heatingType",
        title: t("Heating Type"),
        values: heatingType,
        options: heatingTypeEnum,
        onClick: toggleHeatingType,
        onReset: resetHeatingType,
    },
];

const Fields = () => {
    const { t } = useTranslation();

    const { frameTypeEnum, furnishedEnum, heatingTypeEnum } = useEnums();

    const frameType = useSelector(selectFrameType);
    const furnished = useSelector(selectFurnished);
    const heatingType = useSelector(selectHeatingType);

    const fields = useMemo(
        () =>
            getFEILDS(
                t,
                // values
                frameType,
                furnished,
                heatingType,
                // enums
                frameTypeEnum,
                furnishedEnum,
                heatingTypeEnum
            ),
        [
            t,
            // values
            frameType,
            furnished,
            heatingType,
            // enums
            frameTypeEnum,
            furnishedEnum,
            heatingTypeEnum,
        ]
    );

    return (
        <>
            {fields.map(({ id, ...field }) => (
                <FieldSelect {...field} key={id} />
            ))}
        </>
    );
};

export default Fields;
