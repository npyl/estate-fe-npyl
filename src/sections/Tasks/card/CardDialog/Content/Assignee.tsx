import { MenuItem, SxProps, TextField, Theme } from "@mui/material";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import Autocomplete from "@/components/Autocomplete";
import { IUserMini } from "@/types/user";
import { useAllUsersQuery } from "@/services/user";

const getOptionLabel = ({ firstName, lastName }: IUserMini) =>
    `${firstName} ${lastName}`;

// ------------------------------------------------------------------

const OptionSx: SxProps<Theme> = {
    display: "flex",
    flexDirection: "row",
    gap: 1,
    width: "100%",
};

const RenderOption = (
    props: React.HTMLAttributes<HTMLLIElement>,
    option: IUserMini
) => (
    <MenuItem sx={OptionSx} {...props} key={option.id}>
        {option.firstName} {option.lastName}
    </MenuItem>
);

const AssigneeSelect = () => {
    const { t } = useTranslation();

    // TODO: check inside company ??
    const { data, isLoading } = useAllUsersQuery();

    const options = useMemo(() => (Array.isArray(data) ? data : []), [data]);

    const [value, setValue] = useState<number>();

    return (
        <Autocomplete<IUserMini>
            loading={isLoading}
            value={value}
            onChange={setValue}
            renderOption={RenderOption}
            options={options}
            getOptionLabel={getOptionLabel}
            renderInput={(props) => (
                <TextField label={t("Assignee")} {...props} />
            )}
        />
    );
};

export default AssigneeSelect;
