import { useTranslation } from "react-i18next";
import InputField from "./InputField";
import CustomerAutocomplete from "@/sections/_Autocompletes/RHFCustomerMultiple";
import { ICustomerMini } from "@/types/customer";

const onlyWithEmail = ({ email }: ICustomerMini) => Boolean(email);

const Recipients = () => {
    const { t } = useTranslation();
    return (
        <CustomerAutocomplete
            name="to"
            optionFilter={onlyWithEmail}
            renderInput={(params) => (
                <InputField placeholder={t<string>("To")} {...params} />
            )}
        />
    );
};

export default Recipients;
