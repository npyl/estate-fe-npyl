import { Autocomplete, InputLabel, MenuItem, Stack } from "@mui/material";
import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAllCustomersQuery } from "src/services/customers";
import { useAllUsersQuery } from "src/services/user";
import {
    StyledButton,
    StyledOnlyNumbersInput,
    StyledTextField,
    StyledOutlinedInput,
    StyledSelect,
} from "src/pages/components/BulkEditDrawer/style";
import { useAllGlobalsQuery } from "src/services/global";
import CheckIcon from "@mui/icons-material/Check";
import { Close } from "@mui/icons-material";

import {
    Checkbox,
    FormControl,
    OutlinedInput,
    OutlinedInputProps,
    Select,
    SelectChangeEvent,
} from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Label } from "src/components/label";
import { useGetLabelsQuery } from "src/services/labels";
import { selectDemandLabels, setDemandLabels } from "src/slices/customer";

interface EditProps<T> {
    data: T;
    setData: (data: T) => void;
}

interface DefaultOrEditProps {
    label: string;
    children: React.ReactNode;
    onDisable: () => void;
}

export const DefaultOrEdit = ({
    label,
    children,
    onDisable,
}: DefaultOrEditProps) => {
    const [checked, setChecked] = useState(true);

    useMemo(() => checked && onDisable(), [checked]);

    return (
        <Stack>
            <InputLabel>{label}</InputLabel>
            <StyledButton
                variant="outlined"
                endIcon={
                    checked ? (
                        <CheckIcon color="success" />
                    ) : (
                        <Close color="error" />
                    )
                }
                onClick={() => setChecked(!checked)}
            >
                Default Value
            </StyledButton>
            {!checked && children}
        </Stack>
    );
};

export const EditManager = ({ data, setData }: EditProps<string>) => {
    const { t } = useTranslation();

    interface Fullnames {
        [key: string]: string;
    }

    const usersData = useAllUsersQuery().data || [];

    const fullnames: Fullnames = useMemo(
        () =>
            usersData
                ?.filter((manager) => manager.firstName && manager.lastName) // filter nulls
                .reduce((acc, manager) => {
                    const fullname = `${manager.firstName} ${manager.lastName}`;
                    return { ...acc, [fullname]: `${manager.id}` };
                }, {}),
        [usersData]
    );

    const autocompleteChange = (_event: any, value: string | null) => {
        if (value === null) return;
        setData(fullnameToId(value) || "");
    };

    const fullnameToId = (fullname: string) => fullnames[fullname];
    const idToFullname = (id: string) =>
        Object.keys(fullnames).find((key) => fullnames[key] === id) || "";

    return (
        <DefaultOrEdit label={t("Manager")} onDisable={() => setData("")}>
            <Autocomplete
                disablePortal
                value={idToFullname(data) || ""}
                onChange={autocompleteChange}
                options={Object.keys(fullnames)}
                renderInput={(params) => <StyledTextField {...params} />}
            />
        </DefaultOrEdit>
    );
};

export const EditOwner = ({ data, setData }: EditProps<string>) => {
    const { t } = useTranslation();

    interface Fullnames {
        [key: string]: string;
    }

    const usersData = useAllCustomersQuery().data || [];

    const fullnames: Fullnames = useMemo(
        () =>
            usersData
                ?.filter((manager) => manager.firstName && manager.lastName) // filter nulls
                .reduce((acc, manager) => {
                    const fullname = `${manager.firstName} ${manager.lastName}`;
                    return { ...acc, [fullname]: `${manager.id}` };
                }, {}),
        [usersData]
    );

    const autocompleteChange = (_event: any, value: string | null) => {
        if (value === null) return;
        setData(fullnameToId(value) || "");
    };

    const fullnameToId = (fullname: string) => fullnames[fullname];
    const idToFullname = (id: string) =>
        Object.keys(fullnames).find((key) => fullnames[key] === id) || "";

    return (
        <DefaultOrEdit label={t("Owner")} onDisable={() => setData("")}>
            <Autocomplete
                disablePortal
                value={idToFullname(data) || ""}
                onChange={autocompleteChange}
                options={Object.keys(fullnames)}
                renderInput={(params) => <StyledTextField {...params} />}
            />
        </DefaultOrEdit>
    );
};

export const EditZipCode = ({ data, setData }: EditProps<string>) => {
    const { t } = useTranslation();

    return (
        <DefaultOrEdit label={t("Zip Code")} onDisable={() => setData("")}>
            <StyledOnlyNumbersInput label="" value={data} onChange={setData} />
        </DefaultOrEdit>
    );
};

export const EditArea = ({ data, setData }: EditProps<string>) => {
    const { t } = useTranslation();

    return (
        <DefaultOrEdit label={t("Area")} onDisable={() => setData("")}>
            <StyledOnlyNumbersInput
                label=""
                value={data}
                onChange={setData}
                adornment="m²"
            />
        </DefaultOrEdit>
    );
};

export const EditLabels = ({ data, setData }: EditProps<number[]>) => {
    const { data: allLabels } = useGetLabelsQuery();
    const labelOptions = allLabels?.propertyLabels;

    const handleChange = (event: SelectChangeEvent<number[]>) => {
        const {
            target: { value },
        } = event;
        setData(value as number[]);
    };

    const nameForId = (id: number) =>
        labelOptions?.find((option) => option.id === id)?.name;

    const renderValue = (selected: number[]) =>
        selected.map((id) => nameForId(id)).join(", ");

    if (!labelOptions) return null;

    return (
        <DefaultOrEdit label="Add Labels" onDisable={() => setData([])}>
            <Select
                multiple
                value={data}
                onChange={handleChange}
                renderValue={renderValue}
                input={<StyledOutlinedInput />}
                MenuProps={{ PaperProps: { sx: { maxHeight: "60vh" } } }}
            >
                {labelOptions.map((option) => {
                    return (
                        <MenuItem key={option.id} value={option.id}>
                            <Checkbox checked={data.indexOf(option.id!) > -1} />
                            <Label
                                variant="soft"
                                sx={{
                                    bgcolor: option.color,
                                    borderRadius: 7,
                                    color: "white",
                                }}
                            >
                                {option.name}
                            </Label>
                        </MenuItem>
                    );
                })}
            </Select>
        </DefaultOrEdit>
    );
};

export const EditBedrooms = ({ data, setData }: EditProps<string>) => {
    const { t } = useTranslation();

    return (
        <DefaultOrEdit label={t("Bedrooms")} onDisable={() => setData("")}>
            <StyledOnlyNumbersInput
                type="number"
                label=""
                placeholder="1,2,3..."
                value={data}
                onChange={setData}
            />
        </DefaultOrEdit>
    );
};

export const EditState = ({ data, setData }: EditProps<string>) => {
    const { t } = useTranslation();

    const enums = useAllGlobalsQuery().data;
    const stateEnum = enums?.property?.state;

    return (
        <DefaultOrEdit label={t("State")} onDisable={() => setData("")}>
            <StyledSelect
                value={data}
                onChange={(e) => setData(e.target.value as string)}
            >
                {stateEnum ? (
                    stateEnum.map((item, index) => {
                        return (
                            <MenuItem key={index} value={item}>
                                {item}
                            </MenuItem>
                        );
                    })
                ) : (
                    <MenuItem />
                )}
            </StyledSelect>
        </DefaultOrEdit>
    );
};
