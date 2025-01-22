import Panel, { PanelProps } from "@/components/Panel";
import { FC } from "react";

interface ViewPanelProps extends PanelProps {}

const ViewPanel: FC<ViewPanelProps> = ({ childrenSx, ...props }) => (
    <Panel
        paperSx={{ p: 0 }}
        childrenSx={{
            borderTop: "1px solid",
            borderColor: "divider",
            p: 0,
            ...childrenSx,
        }}
        {...props}
    />
);

export type { ViewPanelProps };
export default ViewPanel;
