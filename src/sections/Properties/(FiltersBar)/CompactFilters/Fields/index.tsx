import { useTranslation } from "react-i18next";
import useEnums from "../../useEnums";
import Section from "./section";
import {
    useFiltersContext,
    useFrameType,
    useFurnished,
    useHeatingType,
} from "@/sections/Properties/FiltersContext";

const Fields = () => {
    const { t } = useTranslation();

    const {
        resetFrameType,
        resetFurnished,
        resetHeatingType,
        toggleFrameType,
        toggleFurnished,
        toggleHeatingType,
    } = useFiltersContext();

    const { frameTypeEnum, furnishedEnum, heatingTypeEnum } = useEnums();

    const frameType = useFrameType();
    const furnished = useFurnished();
    const heatingType = useHeatingType();

    return (
        <>
            <Section
                options={frameTypeEnum}
                title={t("Frame Type")}
                values={frameType}
                toggle={toggleFrameType}
                reset={resetFrameType}
            />
            <Section
                options={furnishedEnum}
                title={t("Furnished")}
                values={furnished}
                toggle={toggleFurnished}
                reset={resetFurnished}
            />
            <Section
                options={heatingTypeEnum}
                title={t("Heating Type")}
                values={heatingType}
                toggle={toggleHeatingType}
                reset={resetHeatingType}
            />
        </>
    );
};

export default Fields;
