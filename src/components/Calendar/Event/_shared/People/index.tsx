import { FC, useMemo } from "react";
import { AvatarGroup, Skeleton, Tooltip } from "@mui/material";
import Avatar from "@/components/Avatar";
import { SpaceBetween } from "@/components/styled";
import dynamic from "next/dynamic";
import {
    TCalendarEventPerson,
    TCalendarEventType,
} from "@/components/Calendar/types";
import { useAllUsersQuery } from "@/services/user";
const ShowAll = dynamic(() => import("./ShowAll"));

// ---------------------------------------------------------------------------------

interface AvatarForEmailProps {
    gwEmail?: string;
}

const AvatarForEmail: FC<AvatarForEmailProps> = ({ gwEmail }) => {
    const { data: users, isLoading } = useAllUsersQuery();

    const user = useMemo(
        () => users?.find(({ workspaceEmail }) => workspaceEmail === gwEmail),
        [users]
    );

    if (isLoading) return <Skeleton variant="circular" />;

    const fullname = `${user?.firstName || ""} ${user?.lastName || ""}`;

    return (
        <Tooltip title={fullname}>
            <Avatar
                firstName={user?.firstName}
                lastName={user?.lastName}
                src={user?.avatar}
            />
        </Tooltip>
    );
};

// ---------------------------------------------------------------------------------

interface PersonProps {
    type: TCalendarEventType;
    p: TCalendarEventPerson;
}

const Person: FC<PersonProps> = ({ type, p }) => {
    if (type === "MEETING") return <AvatarForEmail gwEmail={p.gwEmail} />;

    const fullname = `${p?.firstName || ""} ${p?.lastName || ""}`;

    return (
        <Tooltip title={fullname}>
            <Avatar firstName={p?.firstName} lastName={p?.lastName} />
        </Tooltip>
    );
};

// ---------------------------------------------------------------------------------

const getPerson = (type: TCalendarEventType) => (p: TCalendarEventPerson) =>
    <Person key={JSON.stringify(p)} type={type} p={p} />;

// ---------------------------------------------------------------------------------

interface PeopleProps {
    p: TCalendarEventPerson[];
    type: TCalendarEventType;
}

const People: FC<PeopleProps> = ({ p, type }) => (
    <SpaceBetween>
        <AvatarGroup max={4}>{p.map(getPerson(type))}</AvatarGroup>
        {p.length > 4 ? <ShowAll /> : null}
    </SpaceBetween>
);

export default People;
