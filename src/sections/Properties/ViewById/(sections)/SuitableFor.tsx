import { FC } from "react";
import { ParentCategory } from "src/types/properties";
import { Grid } from "@mui/material";
import { List, ListBooleanItem } from "src/components/List";
import { useTranslation } from "react-i18next";
import PanelWithQuickView from "../PanelWithQuickView";
import { useGetProperty } from "@/hooks/property";

interface SuitableForItemProps {
    field: string;
}

const BASIC_DETAIL_FIELDS: { [key in ParentCategory]: string[] } = {
    RESIDENTIAL: [
        "Student",
        "Cottage",
        "Renovation",
        "Investment",
        "Tourist Rental",
        "Doctor's Office",
        "Professional Use",
    ],
    COMMERCIAL: ["Renovation", "Investment", "Doctor's Office"],
    LAND: ["Agricultural Use", "Investment"],
    OTHER: ["Investment"],
};

const SuitableFor = () => {
    const { t } = useTranslation();

    const { property } = useGetProperty();
    const suitableFor = property?.suitableFor;

    const renderHalfOfFields = (fields: string[], from: number, to: number) => {
        return (
            <Grid item xs={12} sm={6}>
                <List>
                    {fields.slice(from, to).map((field, i) => (
                        <SuitableForItem field={field} key={i} />
                    ))}
                </List>
            </Grid>
        );
    };
    const renderSuitableFor = (category: ParentCategory) => {
        const fieldsForCategory = BASIC_DETAIL_FIELDS[category];
        if (!fieldsForCategory) return null;
        const firstHalfCount = Math.ceil(fieldsForCategory.length / 2);

        return (
            <Grid container>
                {renderHalfOfFields(fieldsForCategory, 0, firstHalfCount)}
                {renderHalfOfFields(
                    fieldsForCategory,
                    firstHalfCount,
                    fieldsForCategory.length
                )}
            </Grid>
        );
    };

    const SuitableForItem: FC<SuitableForItemProps> = ({ field }) => {
        switch (field) {
            case "Student":
                return (
                    <ListBooleanItem
                        label={t("Student")}
                        status={suitableFor?.student}
                    />
                );
            case "Cottage":
                return (
                    <ListBooleanItem
                        label={t("Cottage")}
                        status={suitableFor?.cottage}
                    />
                );
            case "Tourist Rental":
                return (
                    <ListBooleanItem
                        label={t("Tourist Rental")}
                        status={suitableFor?.touristRental}
                    />
                );
            case "Investment":
                return (
                    <ListBooleanItem
                        label={t("Investment")}
                        status={suitableFor?.investment}
                    />
                );
            case "Doctors Office":
                return (
                    <ListBooleanItem
                        label={t("Doctors Office")}
                        status={suitableFor?.doctorsOffice}
                    />
                );
            case "Professional Usage":
                return (
                    <ListBooleanItem
                        label={t("Professional Usage")}
                        status={suitableFor?.professionalUse}
                    />
                );
            case "Renovation":
                return (
                    <ListBooleanItem
                        label={t("Renovation")}
                        status={suitableFor?.renovation}
                    />
                );
            case "Argiciltural Use":
                return (
                    <ListBooleanItem
                        label={t("Argiciltural Use")}
                        status={suitableFor?.agriculturalUse}
                    />
                );
            case "Doctor's Office":
                return (
                    <ListBooleanItem
                        label={t("Doctor's Office")}
                        status={suitableFor?.doctorsOffice}
                    />
                );
            case "Professional Use":
                return (
                    <ListBooleanItem
                        label={t("Professional Use")}
                        status={suitableFor?.professionalUse}
                    />
                );
            case "Agricultural Use":
                return (
                    <ListBooleanItem
                        label={t("Agricultural Use")}
                        status={suitableFor?.agriculturalUse}
                    />
                );
        }
        return null;
    };

    const key = property?.parentCategory.key as ParentCategory;

    return (
        <PanelWithQuickView label="SuitableFor">
            {renderSuitableFor(key)}
        </PanelWithQuickView>
    );
};

export default SuitableFor;
