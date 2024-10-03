import { Autocomplete, FormControl, MenuItem, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { setManagerId } from "src/slices/filters";
import { useAllUsersQuery } from "src/services/user";
import { useTranslation } from "react-i18next";
import { IUser } from "@/types/user";

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

    const handleChange = (_event: any, v: IOption | null) => {
        if (!v) {
            dispatch(setManagerId(undefined));
            return;
        }

        dispatch(setManagerId(v.id));
    };

    return (
        <FormControl sx={{ width: 180 }}>
            <Autocomplete
                disableClearable
                onChange={handleChange}
                options={options}
                renderOption={RenderOption}
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
