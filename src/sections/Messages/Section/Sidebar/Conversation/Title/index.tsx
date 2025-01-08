import Typography from "./Typography";
import dynamic from "next/dynamic";
import { FC } from "react";
const Title0 = dynamic(() => import("./Title0"));

interface TitleProps {
    name?: string;
    userIdsCount: number;
    userId0?: number;
}

const Title: FC<TitleProps> = ({ name, userIdsCount, userId0 }) => {
    if (userIdsCount === 1 && Boolean(userId0))
        return <Title0 userId={userId0!} />;

    return <Typography>{name || ""}</Typography>;
};

export default Title;
