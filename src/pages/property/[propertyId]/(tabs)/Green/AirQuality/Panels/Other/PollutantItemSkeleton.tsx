import Stack from "@mui/material/Stack";
import { PanelPaper } from "../../../Panel/styled";
import { SpaceBetween } from "@/components/styled";
import ColorBar from "./ColorBar";
import { Skeleton } from "@mui/material";

const PollutantItemSkeleton = () => (
    <PanelPaper>
        <Stack p={2}>
            <SpaceBetween>
                <Skeleton variant="text" width="30%" height="35px" />
                <Skeleton variant="text" width="30%" height="35px" />
            </SpaceBetween>
            <ColorBar position={0} />
            <Skeleton variant="text" width="100%" />
        </Stack>
    </PanelPaper>
);

export default PollutantItemSkeleton;
