import { useTranslation } from "react-i18next";
import Panel from "../Panel";
import HealthRecommendation from "./Item";
import HealthRecommendationSkeleton from "./ItemSkeleton";

interface Props {
    isLoading: boolean;
    healthRecommendations?: {
        [key: string]: string;
    };
}

const HealthRecommendationsPanel: React.FC<Props> = ({
    healthRecommendations,
    isLoading,
}) => {
    const { t } = useTranslation();

    return (
        <Panel title={t("Health Recommendations")}>
            {isLoading ? (
                <>
                    <HealthRecommendationSkeleton />
                    <HealthRecommendationSkeleton />
                    <HealthRecommendationSkeleton />
                </>
            ) : null}

            {Object.entries(healthRecommendations || {}).map(([key, value]) => (
                <HealthRecommendation key={key} iconKey={key} content={value} />
            ))}
        </Panel>
    );
};

export default HealthRecommendationsPanel;
