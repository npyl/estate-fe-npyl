import { FC } from "react";
import { useIsGoogleWorkspaceIntegratedQuery } from "@/services/company";
import IsAuthenticatedIndicator, {
    IsAuthenticatedIndicatorProps,
} from "./IsAuthenticatedIndicator";
import AvatarSkeleton from "./AvatarSkeleton";
import DisabledIndicator from "./DisabledIndicator";

/**
 * Indicator for Google Worskpace
 * Checks:
 *  1) whether the office has a google workspace integrated
 *  2) a user is authenticated using oauth
 */

interface WorkspaceIndicatorProps extends IsAuthenticatedIndicatorProps {}

const WorkspaceIndicator: FC<WorkspaceIndicatorProps> = (props) => {
    const { data, isLoading } = useIsGoogleWorkspaceIntegratedQuery();

    if (isLoading) return <AvatarSkeleton sx={props.sx} />;

    if (!data?.isIntegrated) return <DisabledIndicator sx={props.sx} />;

    return <IsAuthenticatedIndicator {...props} />;
};

export default WorkspaceIndicator;
