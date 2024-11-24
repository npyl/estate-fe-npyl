import { FC, useMemo } from "react";
import AvatarGroup from "@/components/Avatar/Group";
import dynamic from "next/dynamic";
import { TCalendarEventPerson } from "@/components/Calendar/types";
import { useAllUsersQuery } from "@/services/user";
import Skeleton from "@mui/material/Skeleton";
import { IUser } from "@/types/user";
import { TUser } from "@/components/Avatar/types";
const ShowAll = dynamic(() => import("./ShowAll"));

// ------------------------------------------------------------------------------

const EMPTY_USER = {
    id: Date.now(),
    firstName: "-",
    lastName: "-",
    avatar: "",
};

const PersonToTUser =
    (data: IUser[] = []) =>
    (
        { gwEmail, firstName = "", lastName = "" }: TCalendarEventPerson,
        idx: number
    ): TUser => {
        if (!gwEmail) {
            return { id: idx, firstName, lastName, avatar: "" };
        }

        const user = data?.find(
            ({ workspaceEmail }) => workspaceEmail === gwEmail
        );

        return user || EMPTY_USER;
    };

// ------------------------------------------------------------------------------

interface PeopleProps {
    p: TCalendarEventPerson[];
}

const People: FC<PeopleProps> = ({ p }) => {
    const { data, isLoading } = useAllUsersQuery();

    const users = useMemo(() => p.map(PersonToTUser(data)) || [], [p, data]);

    if (isLoading) return <Skeleton width="150px" height="58px" />;

    return <AvatarGroup max={2} users={users} MoreAvatars={ShowAll} />;
};

export default People;
