import { useTranslation } from "react-i18next";
import PPRHFCustomerAutocomplete from "@/ui/Autocompletes/RHFCustomer";

const RHFCustomerAutocomplete = () => {
    const { t } = useTranslation();
    return (
        <PPRHFCustomerAutocomplete
            label={t<string>("Customer")}
            name="resourceId"
        />
    );
};

export default RHFCustomerAutocomplete;
