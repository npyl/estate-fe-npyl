import Panel, { PanelProps } from "../../../Panel";
import { Pollutant } from "@/types/googleapi";
import PollutantItem from "./PollutantItem";
import { useTranslation } from "react-i18next";
import PollutantItemSkeleton from "./PollutantItemSkeleton";

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
            {isLoading ? (
                <>
                    <PollutantItemSkeleton />
                    <PollutantItemSkeleton />
                    <PollutantItemSkeleton />
                </>
            ) : null}

            {pollutants?.map((p) => (
                <PollutantItem key={p.code} p={p} />
            ))}
        </Panel>
    );
};

export default OtherPollutants;
