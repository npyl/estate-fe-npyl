import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { Pollutant } from "@/types/googleapi";
import { PanelPaper } from "../../../Panel/styled";
import { SpaceBetween } from "@/components/styled";
import ColorBar from "./ColorBar";
import { Box, IconButton, Tooltip } from "@mui/material";
import Iconify from "@/components/iconify";

interface PollutantItemProps {
    p: Pollutant;
}

const PollutantItem: React.FC<PollutantItemProps> = ({ p }) => (
    <PanelPaper>
        <Stack p={2}>
            <SpaceBetween>
                <Stack direction="row" spacing={0.5} alignItems="center">
                    <Typography
                        variant="body2"
                        fontWeight="600"
                        fontSize="18px"
                    >
                        {p.displayName}
                    </Typography>

                    <Tooltip
                        title={
                            <Typography>{p.additionalInfo.effects}</Typography>
                        }
                    >
                        <IconButton>
                            <Iconify fontSize="20px" icon="quill:info" />
                        </IconButton>
                    </Tooltip>
                </Stack>

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
