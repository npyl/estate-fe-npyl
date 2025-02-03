import { FC } from "react";
import { Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { NormalBadge } from "@/components/Cards/PropertyCard/styled";
import dynamic from "next/dynamic";

interface AgreementTitleProps {
    agreementVariant?: string;
    isAgreementActive?: boolean;
}

const AgreementTitle: FC<AgreementTitleProps> = ({
    agreementVariant,
    isAgreementActive,
}) => {
    const { t } = useTranslation();

    return (
        <Stack
            direction="row"
            justifyContent="flex-start"
            borderBottom="1px solid lightgray"
            gap={2}
            alignItems="center"
        >
            <Stack direction="row" alignItems="center" gap={1}>
                <Typography variant="h5" gutterBottom width="100%">
                    {t("Property Agreement details")}
                </Typography>
            </Stack>
            <Stack direction="row" gap={2}>
                <NormalBadge
                    name={`${t("\t")} ${agreementVariant || ""}`}
                    color={"#84a9ff"}
                    sx={{
                        color: "#84a9ff",
                        width: "100%",
                        mb: 0.5,
                    }}
                />
                {isAgreementActive ? (
                    <NormalBadge
                        name={`${t("Active")}`}
                        color={"#43c6b7"}
                        sx={{
                            color: "#43c6b7 ",
                            width: "100%",
                            mb: 0.5,
                        }}
                    />
                ) : (
                    <NormalBadge
                        name={`${t("Not active")}`}
                        color={"#da6868"}
                        sx={{
                            color: "#da6868",
                            width: "100%",
                            mb: 0.5,
                        }}
                    />
                )}
            </Stack>
        </Stack>
    );
};

export default AgreementTitle;
