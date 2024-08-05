import HomeIcon from "@mui/icons-material/Home";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

interface PropertyDetailsProps {
    code: string;
}
const PropertyDetails: React.FC<PropertyDetailsProps> = ({ code }) => (
    <Stack direction="row" spacing={1} alignItems="center">
        <HomeIcon color="action" />
        <Typography variant="body2">{code}</Typography>
    </Stack>
);

export default PropertyDetails;
