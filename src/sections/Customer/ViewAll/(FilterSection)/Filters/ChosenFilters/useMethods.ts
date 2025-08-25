import { useCallback, useMemo } from "react";
import { useGetLabelsQuery } from "@/services/labels";
import { useAllUsersQuery } from "@/services/user";
import { useChangedFields } from "../../Context";

const useMethods = () => {
    const { data: labelsQuery } = useGetLabelsQuery();
    const { data: users } = useAllUsersQuery();

    const changedProps = useChangedFields();

    const allLabels = useMemo(
        () => labelsQuery?.customerLabels || [],
        [labelsQuery?.customerLabels]
    );

    const hasMinMaxPair = (suffix: string | null): boolean => {
        if (!suffix) return false;

        const minKey = `min${suffix}`;
        const maxKey = `max${suffix}`;

        return (
            changedProps.hasOwnProperty(minKey) &&
            changedProps.hasOwnProperty(maxKey)
        );
    };
    const getLabelNames = useCallback(
        (labelIds: number[]) =>
            labelIds
                .map((id) => {
                    const label = allLabels.find((label) => label.id === id);
                    return label ? label.name : "Unknown";
                })
                .join(", "),
        [allLabels]
    );
    const getManagerName = useCallback(
        (managerId: number) => {
            const user = users?.find((user) => user.id === managerId);
            return `${user?.firstName} ${user?.lastName}`;
        },
        [users]
    );
    return { hasMinMaxPair, getLabelNames, getManagerName };
};

export default useMethods;
