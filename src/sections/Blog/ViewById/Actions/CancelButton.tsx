import Link from "@/components/Link";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";

const CancelButton = () => {
    const { t } = useTranslation();
    return (
        <Button LinkComponent={Link} href={`/blog`}>
            {t("Cancel")}
        </Button>
    );
};

export default CancelButton;
