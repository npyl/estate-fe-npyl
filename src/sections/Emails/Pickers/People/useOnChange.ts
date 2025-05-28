import { useCallback, useMemo } from "react";
import { useGetNamesQuery } from "@/services/customers";
import { useAllUsersQuery } from "@/services/user";
import { isIUser, IUser } from "@/types/user";
import { TPerson } from "@/ui/Autocompletes/People";

const reduceIdToEmail = (data?: TPerson[]) => (acc: string[], toId: number) => {
    const found = data?.find(({ id }) => id === toId);

    const email = found
        ? isIUser(found)
            ? (found as IUser).workspaceEmail
            : found.email
        : undefined;

    if (email) acc.push(email);
    return acc;
};

const useOnChange = (_onChange: (v: string[]) => void) => {
    const { data: customers } = useGetNamesQuery();
    const { data: users } = useAllUsersQuery();
    const data = useMemo(
        () => [...(customers ?? []), ...(users ?? [])],
        [customers, users]
    );
    return useCallback(
        (ids: number[]) => {
            const found = ids.reduce(reduceIdToEmail(data), []);
            _onChange(found);
        },
        [data]
    );
};

export default useOnChange;
