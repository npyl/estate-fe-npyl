import { useMemo } from "react";
import { useGetNamesQuery } from "@/services/customers";
import { useAllUsersQuery } from "@/services/user";
import { TPerson } from "@/ui/Autocompletes/People";
import { isIUser, IUser } from "@/types/user";

const reduceValue = (data?: TPerson[]) => (acc: number[], toEmail: string) => {
    const cId = data?.find((d) => {
        const email = isIUser(d) ? (d as IUser).workspaceEmail : d.email;
        return email === toEmail;
    })?.id;
    if (Boolean(cId)) acc.push(cId!);
    return acc;
};

const useValue = (people: string[]) => {
    const { data: customers } = useGetNamesQuery();
    const { data: users } = useAllUsersQuery();
    const data = useMemo(
        () => [...(customers ?? []), ...(users ?? [])],
        [customers, users]
    );
    return useMemo(() => people.reduce(reduceValue(data), []), [people, data]);
};

export default useValue;
