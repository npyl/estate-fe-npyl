import { MenuItem } from "@mui/material";
import { StyledOutlinedInput } from "@/sections/DataGrids/BulkEditDrawer/style";
import { Checkbox, Select, SelectChangeEvent } from "@mui/material";
import { Label } from "@/components/Label";
import { useGetLabelsQuery } from "src/services/labels";
import DefaultOrEdit from "../../BulkEditDrawer/DefaultOrEdit";
import { useTranslation } from "react-i18next";
import useValueChange from "@/sections/DataGrids/BulkEditDrawer/useValueChange";

type Variant = "property" | "customer";

interface EditLabelsProps {
    variant: Variant;
}

const EditLabels = ({ variant }: EditLabelsProps) => {
    const { t } = useTranslation();

    const [value, onChange, onClear] = useValueChange("labels");

    const { data: allLabels } = useGetLabelsQuery();

    const labelOptions =
        (variant === "property"
            ? allLabels?.propertyLabels
            : allLabels?.customerLabels) || [];

    const handleChange = (event: SelectChangeEvent<number[]>) => {
        const {
            target: { value },
        } = event;
        onChange(value as number[]);
    };

    const nameForId = (id: number) =>
        labelOptions?.find((option) => option.id === id)?.name;

    const renderValue = (selected: number[]) =>
        selected.map((id) => nameForId(id)).join(", ");

    return (
        <DefaultOrEdit label={t("Labels")} name="labels">
            <Select
                multiple
                value={value}
                onChange={handleChange}
                renderValue={renderValue}
                input={<StyledOutlinedInput />}
            >
                {labelOptions.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                        <Checkbox checked={value.indexOf(option.id) > -1} />
                        <Label color={option.color} name={option.name} />
                    </MenuItem>
                ))}
            </Select>
        </DefaultOrEdit>
    );
};

export default EditLabels;
