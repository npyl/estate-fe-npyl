import { useGetThreadQuery } from "@/services/email";
import { useAuth } from "@/hooks/use-auth";
import { FC } from "react";
import Skeleton from "@mui/material/Skeleton";

interface TitleProps {
    threadId: string;
}

const Title: FC<TitleProps> = ({ threadId }) => {
    const { user } = useAuth();
    const { data, isLoading } = useGetThreadQuery({
        userId: user?.id!,
        threadId,
    });

    if (isLoading || !data) return <Skeleton width="100px" height="58px" />;

    return <>{data?.subject}</>;
};

export default Title;
