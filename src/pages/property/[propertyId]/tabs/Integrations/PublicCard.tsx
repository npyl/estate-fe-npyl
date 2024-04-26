import { PublicSvg } from "@/assets/PublicSvg";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { LabeledSwitch } from "../../components/Switch";

interface PublicCardProps {
    label: string;
    published: boolean;
    onClick: () => void;
}

const PublicCard = ({ label, published, onClick }: PublicCardProps) => (
    <Stack p={5} direction="row" width="400px">
        <Box justifyItems="center" flex={1} flexDirection="column">
            <PublicSvg />
            <Typography>{label}</Typography>
        </Box>

        <LabeledSwitch
            checked={published}
            labelOn="Published"
            labelOff="Unpublished"
            onChange={() => onClick()}
            name="checkedA"
            inputProps={{ "aria-label": "secondary checkbox" }}
        />
    </Stack>
);

export default PublicCard;
