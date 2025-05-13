import { ICustomerMini } from "@/types/customer";
import { FC, useCallback, useMemo } from "react";
import CustomerMultiple, {
    CustomerAutocompleteMultipleProps,
    getTagClassname,
} from "@/sections/_Autocompletes/CustomerMultiple";
import { useGetNamesQuery } from "@/services/customers";
import { SxProps, Theme } from "@mui/material";
import { useRouter } from "next/router";
import { toNumberSafe } from "@/utils/toNumber";

// ---------------------------------------------------------------------------

const getSx = (customerId: number): SxProps<Theme> => ({
    // INFO: disable ability to delete tag chip that corresponds to current property (e.g. when opening Emails from tab from PropertyById)
    [`.${getTagClassname(customerId)}`]: {
        ".MuiChip-deleteIcon": {
            display: "none",
        },
    },
});

const onlyWithEmail = ({ email }: ICustomerMini) => Boolean(email);

const isEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const reduceValue =
    (data?: ICustomerMini[]) => (acc: number[], toEmail: string) => {
        const cId = data?.find(({ email }) => email === toEmail)?.id;
        if (Boolean(cId)) acc.push(cId!);
        return acc;
    };

const reduceIdToEmail =
    (data?: ICustomerMini[]) => (acc: string[], toId: number) => {
        const email = data?.find(({ id }) => id === toId)?.email;
        if (email) acc.push(email);
        return acc;
    };

// ---------------------------------------------------------------------------

interface RecipientsProps {
    to: string[];
    onChange: (v: string[]) => void;

    toFreeSoloed: string[];
    onFreeSoloed: (v: string[]) => void;
    onFreeSoloedDelete: (idx: number) => void;

    renderInput: CustomerAutocompleteMultipleProps["renderInput"];
}

const Recipients: FC<RecipientsProps> = ({
    to,
    onChange: _onChange,
    // ...
    toFreeSoloed,
    onFreeSoloed: _onFreeSoloed,
    onFreeSoloedDelete,
    // ...
    ...props
}) => {
    const { data } = useGetNamesQuery();
    const value = useMemo(() => to.reduce(reduceValue(data), []), [to, data]);
    const onChange = useCallback(
        (ids: number[]) => {
            const found = ids.reduce(reduceIdToEmail(data), []);
            _onChange(found);
        },
        [data]
    );

    const onFreeSoloed = useCallback(
        (v: string) => {
            if (!v || !isEmail(v)) return;
            const values = [...toFreeSoloed, v];
            _onFreeSoloed(values);
        },
        [toFreeSoloed, _onFreeSoloed]
    );

    const router = useRouter();
    const { customerId } = router.query;
    const iCustomerId = toNumberSafe(customerId);

    return (
        <CustomerMultiple
            freeSolo
            freeSoloed={toFreeSoloed}
            onFreeSoloed={onFreeSoloed}
            onFreeSoloedDelete={onFreeSoloedDelete}
            value={value}
            onChange={onChange}
            optionFilter={onlyWithEmail}
            sx={getSx(iCustomerId)}
            {...props}
        />
    );
};

export default Recipients;
