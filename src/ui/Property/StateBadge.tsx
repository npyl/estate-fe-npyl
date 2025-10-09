import { getPropertyStatusColor } from "@/theme/colors";
import { KeyValue } from "@/types/KeyValue";
import { FC } from "react";
import { NormalBadge } from "@/ui/Cards/PropertyCard/styled";

interface StateBadgeProps {
    state: KeyValue;
}

const StateBadge: FC<StateBadgeProps> = ({ state }) => {
    const stateColor = getPropertyStatusColor(state?.key);
    return <NormalBadge name={state.value} color={stateColor} />;
};

export default StateBadge;
