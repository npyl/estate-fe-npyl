import { useTranslation } from "react-i18next";
import InputField from "./InputField";
import CustomerAutocomplete from "@/sections/_Autocompletes/RHFCustomerMultiple";

const Recipients = () => {
    const { t } = useTranslation();
    return (
        <CustomerAutocomplete
            name="to"
            renderInput={(params) => (
                <InputField placeholder={t<string>("To")} {...params} />
            )}
        />
    );
};

export default Recipients;
