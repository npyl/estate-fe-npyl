import { useTranslation } from "react-i18next";

import {
    resetFrameType,
    resetFurnished,
    resetHeatingType,
    selectFrameType,
    selectFurnished,
    selectHeatingType,
    toggleFrameType,
    toggleFurnished,
    toggleHeatingType,
} from "src/slices/filters";

import useEnums from "../../useEnums";
import Section from "./section";

const Fields = () => {
    const { t } = useTranslation();

    const { frameTypeEnum, furnishedEnum, heatingTypeEnum } = useEnums();

    return (
        <>
            <Section
                options={frameTypeEnum}
                title={t("Frame Type")}
                selector={selectFrameType}
                toggle={toggleFrameType}
                reset={resetFrameType}
            />
            <Section
                options={furnishedEnum}
                title={t("Furnished")}
                selector={selectFurnished}
                toggle={toggleFurnished}
                reset={resetFurnished}
            />
            <Section
                options={heatingTypeEnum}
                title={t("Heating Type")}
                selector={selectHeatingType}
                toggle={toggleHeatingType}
                reset={resetHeatingType}
            />
        </>
    );
};

export default Fields;
