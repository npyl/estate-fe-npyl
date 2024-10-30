import { FC } from "react";
import { Avatar, AvatarGroup } from "@mui/material";
import { SpaceBetween } from "@/components/styled";
import dynamic from "next/dynamic";
const ShowAll = dynamic(() => import("./ShowAll"));

// ---------------------------------------------------------------------------------

const Member = ({ id }: any) => <Avatar>id</Avatar>;

const getMember = (userId: number) => <Member key={userId} id={userId} />;

interface MembersProps {
    ids: number[];
}

const Members: FC<MembersProps> = ({ ids }) => (
    <SpaceBetween>
        <AvatarGroup>{ids.slice(4).map(getMember)}</AvatarGroup>
        {ids.length > 4 ? <ShowAll /> : null}
    </SpaceBetween>
);

export default Members;
