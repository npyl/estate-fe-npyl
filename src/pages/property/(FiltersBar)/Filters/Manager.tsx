import { Autocomplete, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { selectManagerId, setManagerId } from "src/slices/filters";
import { useAllUsersQuery } from "src/services/user";
import { useTranslation } from "react-i18next";
import { IUser } from "@/types/user";
import { useSelector } from "react-redux";
import { useCallback, useMemo } from "react";

interface IOption {
    id: number;
    label: string;
}

const getOption = ({ id, firstName, lastName }: IUser): IOption => ({
    id,
    label: `${firstName} ${lastName}`,
});

const RenderOption = (
    props: React.HTMLAttributes<HTMLLIElement>,
    option: IOption
) => (
    <li {...props} key={option.id}>
        {option.label}
    </li>
);

export default function ManagerSelect() {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const { data: options } = useAllUsersQuery(undefined, {
        selectFromResult: ({ data }) => ({
            data: data?.map(getOption) || [],
        }),
    });

    const managerId = useSelector(selectManagerId);

    const value = useMemo(
        () =>
            options?.find(({ id }) => id === managerId) || {
                // INFO: prevent uncontrolled state console error
                id: -1,
                label: "",
            },
        [options, managerId]
    );

    const handleChange = useCallback((_event: any, v: IOption | null) => {
        if (!v) {
            dispatch(setManagerId(undefined));
            return;
        }

        dispatch(setManagerId(v.id));
    }, []);

    return (
        <Autocomplete
            disableClearable
            value={value}
            onChange={handleChange}
            options={options}
            renderOption={RenderOption}
            renderInput={(params) => (
                <TextField
                    label={t("Manager")}
                    sx={{
                        width: 180,
                    }}
                    {...params}
                />
            )}
        />
    );
}
