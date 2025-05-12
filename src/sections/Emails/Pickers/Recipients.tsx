import { ICustomerMini } from "@/types/customer";
import { FC, useCallback, useMemo } from "react";
import CustomerMultiple, {
    CustomerAutocompleteMultipleProps,
} from "@/sections/_Autocompletes/CustomerMultiple";
import { useGetNamesQuery } from "@/services/customers";

// ---------------------------------------------------------------------------

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

    return (
        <CustomerMultiple
            freeSolo
            freeSoloed={toFreeSoloed}
            onFreeSoloed={onFreeSoloed}
            onFreeSoloedDelete={onFreeSoloedDelete}
            value={value}
            onChange={onChange}
            optionFilter={onlyWithEmail}
            {...props}
        />
    );
};

export default Recipients;
