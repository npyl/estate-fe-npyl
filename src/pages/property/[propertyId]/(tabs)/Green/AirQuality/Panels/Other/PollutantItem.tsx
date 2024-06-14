import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { Pollutant } from "@/types/googleapi";
import { PanelPaper } from "../styled";
import { SpaceBetween } from "@/components/styled";
import ColorBar from "./ColorBar";

interface PollutantItemProps {
    p: Pollutant;
}

const PollutantItem: React.FC<PollutantItemProps> = ({ p }) => (
    <PanelPaper>
        <Stack p={2}>
            <SpaceBetween>
                <Typography variant="body2" fontWeight="600">
                    {p.displayName}
                </Typography>
                <Typography>
                    {p.concentration.value} {p.concentration.units}
                </Typography>
            </SpaceBetween>
            <ColorBar position={p.concentration.value} />
            <Typography variant="body2" color="text.secondary">
                {p.additionalInfo.sources}
            </Typography>
        </Stack>
    </PanelPaper>
);

export default PollutantItem;
