import {
    Checkbox,
    FormControl,
    MenuItem,
    Select,
    SelectChangeEvent,
} from "@mui/material";
import { FC, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import Label from "@/components/Label/Label";
import { useGetLabelsQuery } from "src/services/labels";
import { StyledInputLabel } from "@/components/Filters";
import { ILabel } from "@/types/label";
import { useFiltersContext, useLabels } from "../../FiltersContext";

interface IOption {
    l: ILabel;
}

const Option: FC<IOption> = ({ l: { id, color, name } }) => {
    const labels = useLabels() || [];
    return (
        <>
            <Checkbox checked={labels.indexOf(id!) > -1} />
            <Label color={color} name={name} />
        </>
    );
};

const getOption = (l: ILabel) => (
    <MenuItem key={l.id} value={l.id}>
        <Option key={l.id} l={l} />
    </MenuItem>
);

export default function FilterLabels() {
    const { t } = useTranslation();

    const labels = useLabels() || [];
    const { setLabels } = useFiltersContext();

    const { data } = useGetLabelsQuery();

    const labelOptions = useMemo(
        () => data?.propertyLabels || [],
        [data?.propertyLabels]
    );

    const renderLabelNames = useCallback(
        (selectedIds: number[]) =>
            selectedIds
                .map(
                    (id) =>
                        labelOptions.find((option) => option.id === id)?.name ||
                        ""
                )
                .join(", "),
        [labelOptions]
    );

    const handleChange = useCallback((event: SelectChangeEvent<number[]>) => {
        const {
            target: { value },
        } = event;
        setLabels(value as number[]);
    }, []);

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
                MenuProps={{
                    PaperProps: {
                        style: {
                            maxHeight: 500,
                        },
                    },
                }}
            >
                {labelOptions.map(getOption)}
            </Select>
        </FormControl>
    );
}
