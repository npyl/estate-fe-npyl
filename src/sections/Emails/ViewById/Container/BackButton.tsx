import Link from "@/components/Link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IconButton from "@mui/material/IconButton";

const BackButton = () => (
    <IconButton LinkComponent={Link} href="/emails">
        <ArrowBackIcon fontSize="small" />
    </IconButton>
);

export default BackButton;
