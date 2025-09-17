import { SxProps, Theme } from "@mui/material";
import SoftTypography from "@/components/SoftLabel";
import { useTranslation } from "react-i18next";

// --------------------------------------------------------------------------------------

const LabelSx: SxProps<Theme> = {
    p: 1,
    borderRadius: "15px",
    // ...
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
};

const ThumbnailLabel = () => {
    const { t } = useTranslation();
    return <SoftTypography sx={LabelSx}>{t("Thumbnail")}</SoftTypography>;
};

// --------------------------------------------------------------------------------------

const MAKE_THUMBNAIL_LABEL = "c-make-thumbnail-label";

const MakeThumbnailLabel = () => {
    const { t } = useTranslation();
    return (
        <SoftTypography
            className={MAKE_THUMBNAIL_LABEL}
            display="none"
            color="warning"
            sx={LabelSx}
        >
            {t("MAKE_THUMBNAIL")}
        </SoftTypography>
    );
};

// --------------------------------------------------------------------------------------

export { MAKE_THUMBNAIL_LABEL, ThumbnailLabel, MakeThumbnailLabel };
