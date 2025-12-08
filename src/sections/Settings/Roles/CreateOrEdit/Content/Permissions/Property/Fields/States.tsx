import { useTranslation } from "react-i18next";
import RHFStateMultiplePicker from "@/ui/Pickers/RHF/StateMultiple";
import { RHFCheckbox } from "@/components/hook-form";
import WithAll from "./WithAll";
import Field from "./Field";

const allName = "propertyPermissions.allStates";

const WithAllPicker = WithAll(RHFStateMultiplePicker, allName);

const States = () => {
    const { t } = useTranslation();
    return (
        <Field label={t("States")}>
            <RHFCheckbox label={t("All_Feminine")} name={allName} />
            <WithAllPicker name="propertyPermissions.states" />
        </Field>
    );
};

export default States;
