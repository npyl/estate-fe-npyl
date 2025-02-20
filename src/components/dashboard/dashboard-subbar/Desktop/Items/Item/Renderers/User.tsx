import { FC } from "react";
import { useGetUserQuery } from "@/services/user";
import { ITabRendererProps } from "../types";

const User: FC<ITabRendererProps> = ({ resourceId }) => {
    const { data } = useGetUserQuery(resourceId!, {
        skip: !Boolean(resourceId),
    });
    const { firstName, lastName } = data || {};
    return `${firstName || ""} ${lastName || ""}`;
};

export default User;
