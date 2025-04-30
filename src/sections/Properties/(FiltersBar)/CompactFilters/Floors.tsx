import ClearableSection from "@/components/Filters/ClearableSection";
import { useTranslation } from "react-i18next";
import {
    useFiltersContext,
    useMaxFloor,
    useMinFloor,
} from "../../FiltersContext";
import FloorPicker from "@/sections/_Pickers/Floor";

const FloorSelector = () => {
    const { t } = useTranslation();

    const minFloor = useMinFloor();
    const maxFloor = useMaxFloor();

    const { resetFloor, setMinFloor, setMaxFloor } = useFiltersContext();

    return (
        <ClearableSection title={t("Floors")} reset={resetFloor}>
            <FloorPicker
                min={minFloor}
                max={maxFloor}
                onReset={resetFloor}
                onMinChange={setMinFloor}
                onMaxChange={setMaxFloor}
            />
        </ClearableSection>
    );
};

export default FloorSelector;
