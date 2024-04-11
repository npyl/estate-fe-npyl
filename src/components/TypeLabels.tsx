import { Box, BoxProps } from "@mui/material";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Label, LabelColor } from "@/components/Label";
import useResponsive from "src/hooks/useResponsive";

interface TypeProps extends BoxProps {
    forceTruncate?: boolean;

    seller: boolean;
    lessor: boolean;
    leaser: boolean;
    buyer: boolean;
}

export const TypeLabels = ({
    seller,
    lessor,
    leaser,
    buyer,

    forceTruncate = false,

    ...props
}: TypeProps) => {
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

    const belowSm = useResponsive("down", "sm");

    return (
        <Box
            display="flex"
            flexDirection="row"
            flexWrap="wrap"
            gap={0.7}
            {...props}
        >
            {Object.entries(map).map(([type, { value, color }]) =>
                value ? (
                    <Label
                        key={type}
                        opaque
                        color={color}
                        name={
                            belowSm || forceTruncate
                                ? t(type).slice(0, 3)
                                : t(type)
                        }
                    />
                ) : null
            )}
        </Box>
    );
};
