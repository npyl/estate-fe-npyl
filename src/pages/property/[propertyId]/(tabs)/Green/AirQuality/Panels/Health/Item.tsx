import {
    BeachAccess,
    SentimentVeryDissatisfied,
    Face,
    PregnantWoman,
    ChildCare,
    SportsSoccer,
} from "@mui/icons-material";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const healthRecommendationIcons: { [key: string]: JSX.Element } = {
    generalPopulation: <BeachAccess />,
    elderly: <SentimentVeryDissatisfied />,
    lungDiseasePopulation: <Face />,
    heartDiseasePopulation: <Face />,
    athletes: <SportsSoccer />,
    pregnantWomen: <PregnantWoman />,
    children: <ChildCare />,
};
interface HealthRecommendationProps {
    iconKey: keyof typeof healthRecommendationIcons;
    content: string;
}

const HealthRecommendation = ({
    iconKey,
    content,
}: HealthRecommendationProps) => (
    <Stack direction="row" alignItems="center" spacing={1}>
        {healthRecommendationIcons[iconKey]}
        <Typography variant="body2">{content}</Typography>
    </Stack>
);

export default HealthRecommendation;
