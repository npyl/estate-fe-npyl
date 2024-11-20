import UsersAutocomplete from "./Autocomplete";
import { IUser } from "@/types/user";
import { AutocompleteRenderGetTagProps } from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

// ---------------------------------------------------------------

const renderTags = (
    tagValue: IUser[],
    getTagProps: AutocompleteRenderGetTagProps
) =>
    tagValue.map((option, index) => {
        const { key, ...tagProps } = getTagProps({ index });

        const fullname = `${option.firstName || ""} ${
            option.lastName?.[0] || ""
        }`;

        return <Chip key={key} label={fullname} {...tagProps} />;
    });

// ---------------------------------------------------------------

const peopleKey = "people";

const Meeting = () => {
    const { t } = useTranslation();

    const { control } = useFormContext();

    return (
        <Controller
            name={peopleKey}
            control={control}
            render={({ field }) => (
                <UsersAutocomplete
                    multiple
                    label={t("Meeting with")}
                    renderTags={renderTags}
                    {...field}
                />
            )}
        />
    );
};

export default Meeting;
