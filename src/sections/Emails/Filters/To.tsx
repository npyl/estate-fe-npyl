import { errorToast } from "@/components/Toaster";
import CustomerAutocomplete from "@/sections/_Autocompletes/Customer";
import { useFiltersContext } from "@/sections/Emails/Filters/Context";
import {
    useFindByEmailQuery,
    useLazyGetCustomerByIdQuery,
} from "@/services/customers";
import { SxProps, Theme } from "@mui/material";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";

const Sx: SxProps<Theme> = {
    width: "200px",
};

const ToFilter = () => {
    const { t } = useTranslation();

    const { filters, setTo } = useFiltersContext();
    const { to } = filters;

    const { data } = useFindByEmailQuery(to!, { skip: !to });
    const value = data?.id;

    const [getById] = useLazyGetCustomerByIdQuery();

    const onChange = useCallback(
        async (v: number) => {
            const found = await getById(v);
            if ("error" in found) return;

            const email = found?.data?.email;
            if (!email) {
                errorToast("EMAILS_CUSTOMER_WITHOUT_EMAIL");
                return;
            }

            setTo(email);
        },
        [data]
    );

    return (
        <CustomerAutocomplete
            sx={Sx}
            label={t<string>("Customer")}
            value={value}
            onChange={onChange}
        />
    );
};

export default ToFilter;
