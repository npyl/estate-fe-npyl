import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Label, LabelColor } from "src/components/label";

interface TypeProps {
    seller: boolean;
    lessor: boolean;
    leaser: boolean;
    buyer: boolean;
}

export const TypeLabels = ({ seller, lessor, leaser, buyer }: TypeProps) => {
    const { t } = useTranslation();

    const map = useMemo(
        () => ({
            ["Seller"]: {
                value: seller,
                color: "success",
            },
            ["Lessor"]: {
                value: lessor,
                color: "error",
            },
            ["Leaser"]: {
                value: leaser,
                color: "warning",
            },
            ["Buyer"]: {
                value: buyer,
                color: "info",
            },
        }),
        [seller, lessor, leaser, buyer]
    );

    return (
        <>
            {Object.entries(map).map(([type, { value, color }]) =>
                value ? (
                    <Label
                        key={type}
                        variant="soft"
                        opaque
                        color={color as LabelColor}
                    >
                        {t(type)}
                    </Label>
                ) : null
            )}
        </>
    );
};
