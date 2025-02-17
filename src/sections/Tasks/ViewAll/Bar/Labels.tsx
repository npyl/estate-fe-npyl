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
import { useFiltersContext } from "../../filters";

// -----------------------------------------------------------

interface IOption {
    l: ILabel;
}

const Option: FC<IOption> = ({ l: { id, color, name } }) => {
    const { labels } = useFiltersContext();
    const checked = (labels || []).indexOf(id!) > -1;
    return (
        <>
            <Checkbox checked={checked} />
            <Label color={color} name={name} />
        </>
    );
};

// -----------------------------------------------------------

const getOption = (l: ILabel) => (
    <MenuItem key={l.id} value={l.id}>
        <Option key={l.id} l={l} />
    </MenuItem>
);

// -----------------------------------------------------------

export default function FilterLabels() {
    const { t } = useTranslation();
    const { labels, setLabels } = useFiltersContext();

    const { data } = useGetLabelsQuery();
    const labelOptions = useMemo(
        () => data?.ticketLabels || [],
        [data?.ticketLabels]
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
