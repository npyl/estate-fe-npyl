import CustomerAutocomplete from "@/sections/_Autocompletes/Customer";
import { useFiltersContext } from "@/sections/Emails/Filters/Context";
import {
    useFindByEmailQuery,
    useLazyGetCustomerByIdQuery,
} from "@/services/customers";
import { SxProps, Theme } from "@mui/material";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { ICustomerMini } from "@/types/customer";
import { useRouter } from "next/router";

const onlyWithEmail = ({ email }: ICustomerMini) => Boolean(email);

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
            if (!email) return;

            setTo(email);
        },
        [data]
    );

    // INFO: prevent picker on customer view
    const router = useRouter();
    const { customerId } = router.query;
    if (Boolean(customerId)) return null;

    return (
        <CustomerAutocomplete
            sx={Sx}
            label={t<string>("Customer")}
            optionFilter={onlyWithEmail}
            value={value}
            onChange={onChange}
        />
    );
};

export default ToFilter;
