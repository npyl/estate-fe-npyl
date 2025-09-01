import { FC } from "react";
import { useGetUserQuery } from "@/services/user";
import { ITabRendererProps } from "../types";
import isFalsy from "@/utils/isFalsy";

const User: FC<ITabRendererProps> = ({ resourceId }) => {
    const { data } = useGetUserQuery(resourceId!, {
        skip: isFalsy(resourceId),
    });
    const { firstName, lastName } = data ?? {};
    return `${firstName || ""} ${lastName || ""}`;
};

export default User;
