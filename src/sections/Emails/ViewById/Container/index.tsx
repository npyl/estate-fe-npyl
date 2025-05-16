import IsAuthenticatedIndicator from "@/sections/Google/WorkspaceIndicator/IsAuthenticatedIndicator";
import Stack from "@mui/material/Stack";
import ReplyButton from "./ReplyButton";
import { FC, PropsWithChildren } from "react";
import { SpaceBetween } from "@/components/styled";
import CollapseToggle from "./CollapseToggle";
import Title from "./Title";
import useToggle from "@/hooks/useToggle";
import { COLLAPSED_CLASSNAME, CONTAINER_CLASSNAME } from "../constant";
import IsAuthenticatedGuard from "@/sections/Google/IsAuthenticatedGuard";

interface ContainerProps extends PropsWithChildren {
    threadId: string;
}

const Container: FC<ContainerProps> = ({ threadId, children }) => {
    const [isCollapsed, toggle] = useToggle();

    const className = `${CONTAINER_CLASSNAME} ${isCollapsed ? COLLAPSED_CLASSNAME : ""}`;

    return (
        <Stack className={className} spacing={1}>
            <SpaceBetween alignItems="center">
                <Title threadId={threadId} />

                <Stack direction="row" spacing={1} alignItems="center">
                    <CollapseToggle
                        isCollapsed={isCollapsed}
                        onClick={toggle}
                    />
                    <IsAuthenticatedIndicator />
                </Stack>
            </SpaceBetween>

            {children}

            <IsAuthenticatedGuard>
                <ReplyButton />
            </IsAuthenticatedGuard>
        </Stack>
    );
};

export default Container;
