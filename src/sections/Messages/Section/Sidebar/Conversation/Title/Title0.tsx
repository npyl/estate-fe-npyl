import { useGetUserQuery } from "@/services/user";
import Skeleton from "@mui/material/Skeleton";
import Typography from "./Typography";
import { FC } from "react";
import toNumberSafe from "@/utils/toNumberSafe";

interface Title0Props {
    userId: string;
}

const Title0: FC<Title0Props> = ({ userId }) => {
    const iUserId = toNumberSafe(userId);

    const { data, isLoading } = useGetUserQuery(iUserId);
    const { firstName, lastName } = data ?? {};
    const fullname = `${firstName || ""} ${lastName || ""}`;

    if (isLoading) return <Skeleton width="70%" height="35px" variant="text" />;

    return <Typography>{fullname}</Typography>;
};

export default Title0;
