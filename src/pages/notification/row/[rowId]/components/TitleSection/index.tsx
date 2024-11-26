import React from "react";
import { Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { NormalBadge } from "@/components/Cards/PropertyCard/styled";
import { ContactNotificationExtended } from "@/types/notification";
import { SpaceBetween } from "@/components/styled";
import dynamic from "next/dynamic";
const CreateTaskButton = dynamic(() => import("./CreateTaskButton"));

interface TitleSectionProps {
    type: string;
    variant?: string;
    agreementVariant?: string;
    isAgreementActive?: boolean;
    data: ContactNotificationExtended;
}

const TitleSection: React.FC<TitleSectionProps> = ({
    type,
    agreementVariant,
    isAgreementActive,
    data,
}) => {
    const { t } = useTranslation();

    const getTitle = () => {
        switch (type) {
            case "TOUR":
                return t("Tour request details");
            case "REVIEW":
                return t("Review Details");
            case "LISTING":
                return t("Listing details");
            case "WORK_FOR_US":
                return t("Work application details");
            case "AGREEMENT":
                return t("Property Agreement details");
            default:
                return "";
        }
    };

    return (
        <>
            {type === "AGREEMENT" ? (
                <Stack
                    direction="row"
                    justifyContent="flex-start"
                    borderBottom="1px solid lightgray"
                    gap={2}
                    alignItems="center"
                >
                    <Stack direction="row" alignItems="center" gap={1}>
                        <Typography variant="h5" gutterBottom width="100%">
                            {getTitle()}
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
            ) : (
                <SpaceBetween
                    borderBottom="1px solid lightgray"
                    pb={1}
                    mb={1}
                    alignItems="center"
                >
                    <Typography variant="h5" width={1} gutterBottom>
                        {getTitle()}
                    </Typography>

                    <CreateTaskButton data={data} />
                </SpaceBetween>
            )}
        </>
    );
};

export default TitleSection;
