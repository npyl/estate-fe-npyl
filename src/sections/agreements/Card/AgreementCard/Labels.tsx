import { IAgreementType } from "@/types/agreements";
import { Label } from "@/components/Label";

interface CardLabelProps {
    variant: IAgreementType;
}

const CardLabel: React.FC<CardLabelProps> = ({ variant }) => (
    <Label
        opaque
        color={variant === "BASIC" ? "primary" : "info"}
        name={variant}
    />
);

const DraftLabel = () => (
    <Label opaque color="warning" justifyContent="center" name="Draft" />
);

export { CardLabel, DraftLabel };
