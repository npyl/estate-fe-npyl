import NextLink from "next/link";
import HomeIcon from "@mui/icons-material/Home";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";

interface PropertyDetailsProps {
    propertyId: number;
    code: string;
}
const PropertyDetails: React.FC<PropertyDetailsProps> = ({
    propertyId,
    code,
}) => (
    <Stack direction="row" spacing={1} alignItems="center">
        <HomeIcon color="action" />
        <IconButton
            component={NextLink}
            size="small"
            href={`/property/${propertyId}`}
        >
            {code}
        </IconButton>
    </Stack>
);

export default PropertyDetails;
