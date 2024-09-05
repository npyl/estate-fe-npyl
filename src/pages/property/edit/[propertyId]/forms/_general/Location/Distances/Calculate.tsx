import useResponsive from "@/hooks/useResponsive";
import { LoadingButton } from "@mui/lab";
import { useTranslation } from "react-i18next";
import useCalculate from "./useCalculate";

interface Props {
    map?: google.maps.Map;
}

const CalculateDistances = ({ map }: Props) => {
    const { t } = useTranslation();

    const belowMd = useResponsive("down", "md");

    const { isLoaded, isCalculating, calculateDistances } = useCalculate(map);

    return (
        <LoadingButton
            variant="outlined"
            disabled={!isLoaded}
            loading={isCalculating}
            onClick={calculateDistances}
        >
            {belowMd ? t("Calculate") : `${t("Calculate (within")} 10km)`}
        </LoadingButton>
    );
};

export default CalculateDistances;
