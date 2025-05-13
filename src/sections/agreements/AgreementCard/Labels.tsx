import { IAgreementType } from "@/types/agreements";
import { Label } from "@/components/Label";
import { useTranslation } from "react-i18next";

export interface CardLabelProps {
    variant: IAgreementType;
    name: string;
}

const CardLabel: React.FC<CardLabelProps> = ({ variant, name }) => (
    <Label
        opaque
        color={
            variant === "BASIC"
                ? "primary"
                : variant === "BASIC_EXCLUSIVE"
                ? "info"
                : "success"
        }
        name={name}
    />
);

const DraftLabel = () => {
    const { t } = useTranslation();
    return (
        <Label
            opaque
            color="warning"
            justifyContent="center"
            name={t("_draft_")}
        />
    );
};

export { CardLabel, DraftLabel };
