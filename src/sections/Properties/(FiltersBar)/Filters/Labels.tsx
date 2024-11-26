import {
    Checkbox,
    FormControl,
    MenuItem,
    Select,
    SelectChangeEvent,
} from "@mui/material";
import { FC, useMemo } from "react";
import { useTranslation } from "react-i18next";
import Label from "@/components/Label/Label";
import { useGetLabelsQuery } from "src/services/labels";
import { useDispatch } from "src/store";
import { StyledInputLabel } from "@/components/Filters";
import { useSelector } from "react-redux";
import { selectLabels, setLabels } from "@/slices/filters";
import { ILabel } from "@/types/label";

const Option: FC<ILabel> = ({ id, color, name }) => {
    const labels = useSelector(selectLabels) || [];
    return (
        <MenuItem key={id} value={id}>
            <Checkbox checked={labels.indexOf(id!) > -1} />
            <Label color={color} name={name} />
        </MenuItem>
    );
};

const getOption = (l: ILabel) => <Option key={l.id} {...l} />;

export default function FilterLabels() {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const labels = useSelector(selectLabels) || [];

    const { data } = useGetLabelsQuery();

    const labelOptions = useMemo(() => data?.propertyLabels, [data]) || [];

    const renderLabelNames = (selectedIds: number[]) =>
        selectedIds
            .map((id) => {
                const labelOption = labelOptions.find(
                    (option) => option.id === id
                );
                return labelOption ? labelOption.name : "Unknown";
            })
            .join(", ");

    const handleChange = (event: SelectChangeEvent<typeof labels>) => {
        const {
            target: { value },
        } = event;
        dispatch(
            setLabels(
                // On autofill we get a stringified value.
                typeof value === "string" ? value.split(",") : value
            )
        );
    };

    return (
        <FormControl
            sx={{
                minWidth: "130px",
                maxWidth: "200px",
                maxHeight: "38px",

                display: {
                    md: "none",
                    lg: "flex",
                },
            }}
        >
            <StyledInputLabel>{t("Labels")}</StyledInputLabel>
            <Select
                multiple
                value={labels}
                onChange={handleChange}
                renderValue={renderLabelNames}
                label={t("Labels")}
            >
                {labelOptions.map(getOption)}
            </Select>
        </FormControl>
    );
}
