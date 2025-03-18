import { useTranslation } from "react-i18next";
import { EditProps } from "@/sections/DataGrids/PropertiesToolbar/BulkEdit/types";
import { DefaultOrEdit } from "@/sections/DataGrids/PropertiesToolbar/BulkEdit/DefaultOrEdit";
import ManagerAutocomplete from "@/sections/_Autocompletes/Manager";
import { toNumberSafe } from "@/utils/toNumber";
import { useCallback } from "react";

export const EditManager = ({ data, setData }: EditProps<string>) => {
    const { t } = useTranslation();

    const iValue = toNumberSafe(data);
    const onChange = useCallback((v: number) => {
        setData(v.toString());
    }, []);

    return (
        <DefaultOrEdit label={t("Manager")} onDisable={() => setData("")}>
            <ManagerAutocomplete value={iValue} onChange={onChange} />
        </DefaultOrEdit>
    );
};
