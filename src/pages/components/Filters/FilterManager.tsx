import { Autocomplete, FormControl, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectManagerId, setManagerId } from "src/slices/filters";

import { useAllUsersQuery } from "src/services/user";

import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

export default function ManagerSelect() {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const managerId = useSelector(selectManagerId);
    const [autocompleteValue, setAutocompleteValue] = useState("");

    useEffect(
        () => setAutocompleteValue(managerId?.toString() || ""),
        [managerId]
    );

    const { data: managerIdsValues } = useAllUsersQuery(undefined, {
        selectFromResult: ({ data }) => ({
            data:
                data?.map((user) => ({
                    id: user.id,
                    value: `${user.firstName} ${user.lastName}`,
                })) || [],
        }),
    });

    const managerValues = useMemo(
        () => managerIdsValues.map((pair) => pair.value),
        [managerIdsValues]
    );

    const autocompleteChange = (_event: any, value: string | null) => {
        setAutocompleteValue(value || "");

        if (!value) {
            dispatch(setManagerId(undefined));
            return;
        }

        const idForValue = managerIdsValues.find(
            (manager) => manager.value === value
        )?.id;

        if (!idForValue) return;

        dispatch(setManagerId(idForValue));
    };

    return (
        <FormControl sx={{ width: 135 }}>
            <Autocomplete
                disablePortal
                value={autocompleteValue}
                onChange={autocompleteChange}
                options={managerValues}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        placeholder={t("Manager") as string}
                    />
                )}
            />
        </FormControl>
    );
}
