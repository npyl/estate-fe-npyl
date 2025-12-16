import RHFManagerMultipleAutocomplete from "@/ui/Autocompletes/RHFManagerMultiple";
import { useTranslation } from "react-i18next";

const Users = () => {
    const { t } = useTranslation();
    return (
        <RHFManagerMultipleAutocomplete
            label={t<string>("Users")}
            name="users"
        />
    );
};

export default Users;
