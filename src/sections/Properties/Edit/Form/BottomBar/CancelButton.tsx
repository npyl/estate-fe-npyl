import { Button } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { useTranslation } from "react-i18next";
import Link from "@/components/Link";
import { useRouter } from "next/router";

const CancelButton = () => {
    const { t } = useTranslation();

    const router = useRouter();
    const { propertyId } = router.query;

    return (
        <Button
            LinkComponent={Link}
            variant="outlined"
            startIcon={<CancelIcon />}
            href={`/property/${propertyId}`}
        >
            {t("Cancel")}
        </Button>
    );
};

export default CancelButton;
