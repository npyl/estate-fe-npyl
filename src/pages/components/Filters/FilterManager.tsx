import { Autocomplete, FormControl, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { setManagerId } from "src/slices/filters";
import { useAllUsersQuery } from "src/services/user";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

export default function ManagerSelect() {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const [autocompleteValue, setAutocompleteValue] = useState("");

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
        <FormControl sx={{ width: 180 }}>
            <Autocomplete
                disablePortal
                clearIcon={<></>}
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
