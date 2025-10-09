import { IProperties, IPropertyResultResponse } from "@/types/properties";
import { Stack } from "@mui/material";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { SpaceBetween } from "@/components/styled";
import CodeBadge from "@/ui/Property/CodeBadge";
import CategoryBadge from "@/ui/Property/CategoryBadge";
import StateBadge from "@/ui/Property/StateBadge";
import PriceBadge from "@/ui/Property/PriceBadge";

interface BadgesProps {
    item: IPropertyResultResponse | IProperties;
}

const Badges: FC<BadgesProps> = ({ item }) => {
    const { t } = useTranslation();

    const { price, code, state, category } = item || {};

    return (
        <>
            <Stack
                direction="row"
                alignItems="center"
                sx={{ flexWrap: "wrap", gap: 1 }}
            >
                {state?.value ? <StateBadge state={state} /> : null}
                <CategoryBadge name={category.value} />
            </Stack>
            <SpaceBetween alignItems="center">
                <CodeBadge code={`${t("Code")}: ${code || ""}`} />
                <PriceBadge price={price} />
            </SpaceBetween>
        </>
    );
};

export default Badges;
