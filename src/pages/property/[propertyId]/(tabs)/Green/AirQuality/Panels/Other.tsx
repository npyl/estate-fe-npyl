import Panel, { PanelProps } from "../Panel";
import { Pollutant } from "@/types/googleapi";
import PollutantItem from "./PollutantItem";
import { useTranslation } from "react-i18next";

interface OtherPollutantsProps extends Omit<PanelProps, "title"> {
    pollutants: Pollutant[];
    isLoading: boolean;
}

const OtherPollutants: React.FC<OtherPollutantsProps> = ({
    isLoading,
    pollutants,
    ...props
}) => {
    const { t } = useTranslation();
    return (
        <Panel {...props} title={t("Other Pollutants")}>
            {pollutants?.map((p, i) => (
                <PollutantItem key={i} p={p} />
            ))}
        </Panel>
    );
};

export default OtherPollutants;
