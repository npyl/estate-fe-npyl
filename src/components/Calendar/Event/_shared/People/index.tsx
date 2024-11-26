import { FC, useMemo } from "react";
import AvatarGroup from "@/components/Avatar/Group";
import dynamic from "next/dynamic";
import { TCalendarEventPerson } from "@/components/Calendar/types";
import { useAllUsersQuery } from "@/services/user";
import Skeleton from "@mui/material/Skeleton";
import { IUser } from "@/types/user";
import { TUser } from "@/components/Avatar/types";
import { ICustomer } from "@/types/customer";
import { useAllCustomersQuery } from "@/services/customers";
const ShowAll = dynamic(() => import("./ShowAll"));

// ------------------------------------------------------------------------------

const EMPTY_USER = {
    id: Date.now(),
    firstName: "-",
    lastName: "-",
    avatar: "",
};

const PersonToTUser =
    (users: IUser[] = [], customers: ICustomer[] = []) =>
    (
        {
            gwEmail,
            customerId,
            firstName = "",
            lastName = "",
        }: TCalendarEventPerson,
        idx: number
    ): TUser => {
        const haveGwEmail = Boolean(gwEmail);
        const isCustomer = Boolean(customerId);

        if (isCustomer) {
            const found = customers?.find(({ id }) => id === customerId);
            return {
                id: customerId,
                firstName: found?.firstName || "",
                lastName: found?.lastName || "",
                avatar: "",
            };
        }

        if (!haveGwEmail) {
            return { id: idx, firstName, lastName, avatar: "" };
        }

        const user = users?.find(
            ({ workspaceEmail }) => workspaceEmail === gwEmail
        );

        return user || EMPTY_USER;
    };

// ------------------------------------------------------------------------------

interface PeopleProps {
    p: TCalendarEventPerson[];
}

const People: FC<PeopleProps> = ({ p }) => {
    const { data: customers, isLoading: isLoading_0 } = useAllCustomersQuery();
    const { data: users, isLoading: isLoading_1 } = useAllUsersQuery();

    const data = useMemo(
        () => p.map(PersonToTUser(users, customers)) || [],
        [p, users, customers]
    );

    if (isLoading_0 || isLoading_1)
        return <Skeleton width="150px" height="58px" />;

    return <AvatarGroup max={6} users={data} MoreAvatars={ShowAll} />;
};

export default People;
