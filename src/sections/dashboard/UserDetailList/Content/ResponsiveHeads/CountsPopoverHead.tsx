import { useTranslation } from "react-i18next";
import CustomTypography from "./CustomTypography";

const CountsPopoverHead = () => {
    const { t } = useTranslation();
    return (
        <CustomTypography
            width={1 / 3}
            label={t("Statistics")}
            display={{ xs: "block", md: "none" }}
        />
    );
};

export default CountsPopoverHead;
