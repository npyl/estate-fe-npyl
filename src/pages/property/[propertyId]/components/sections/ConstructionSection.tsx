import { IProperties, ParentCategory } from "src/types/properties";

import { Box, Divider, Grid, Paper, Typography } from "@mui/material";

import { List, ListBooleanItem, ListItem } from "src/components/List";
import { useTranslation } from "react-i18next";

interface ConstructionSectionProps {
    data: IProperties;
}
const BASIC_DETAIL_FIELDS: { [key in ParentCategory]: string[] } = {
    RESIDENTIAL: [
        "Year of Construction",
        "Year of Renovation",
        "Total Floor Number",
        "Under Construction",
        "Renovated",
        "Needs Renovation",
        "Elevator",
        "Internal Stairs",
        "Newly Build",
        "Incomplete",
        "Neoclassical",
        "Preserved",
    ],
    COMMERCIAL: [
        "Year of Construction",
        "Year of Renovation",
        "Total Floor Number",
        "Under Construction",
        "Renovated",
        "Needs Renovation",
        "Internal Stairs",
        "Newly Build",
        "Incomplete",
        "Neoclassical",
        "Preserved",
    ],
    LAND: [],
    OTHER: [
        "Year of Construction",
        "Under Construction",
        "Internal Stairs",
        "Newly Build",
        "Incomplete",
    ],
};
const ConstructionSection: React.FC<ConstructionSectionProps> = (props) => {
    const { data } = props;
    const { t } = useTranslation();
    const construction = data?.construction;
    if (data.parentCategory.key === "LAND") return null;
    const renderThirdOfFields = (
        fields: string[],
        from: number,
        to: number
    ) => (
        <Grid item xs={4}>
            <List>
                {fields
                    .slice(from, to)
                    .map((field) => renderConstuctionItem(field))}
            </List>
        </Grid>
    );

    const propertyConstruction = (category: ParentCategory) => {
        const fieldsForCategory = BASIC_DETAIL_FIELDS[category];
        if (!fieldsForCategory) return null;

        const total = fieldsForCategory.length;
        const third = Math.floor(total / 3);

        // Calculate remaining items after dividing into thirds
        const remaining = total - third * 3;

        // Indices to divide fieldsForCategory
        const firstEnd = third + (remaining > 0 ? 1 : 0);
        const secondEnd = firstEnd + third + (remaining > 1 ? 1 : 0);

        return (
            <Grid container>
                {renderThirdOfFields(fieldsForCategory, 0, firstEnd)}
                {renderThirdOfFields(fieldsForCategory, firstEnd, secondEnd)}
                {renderThirdOfFields(fieldsForCategory, secondEnd, total)}
            </Grid>
        );
    };
    const renderConstuctionItem = (field: string) => {
        switch (field) {
            case "Year of Construction":
                return (
                    <ListItem
                        label={t("Year Of Construction")}
                        value={construction?.yearOfConstruction}
                        align="horizontal"
                    />
                );
            case "Year of Renovation":
                return (
                    <ListItem
                        label={t("Year Of Renovation")}
                        value={construction?.yearOfRenovation}
                        align="horizontal"
                    />
                );
            case "Total Floor Number":
                return (
                    <ListItem
                        label={t("Total Floor Number")}
                        value={construction?.totalFloorNumber}
                        align="horizontal"
                    />
                );
            case "Under Construction":
                return (
                    <ListBooleanItem
                        label={t("Under Construction")}
                        status={construction?.underConstruction}
                        align="horizontal"
                    />
                );
            case "Renovated":
                return (
                    <ListBooleanItem
                        label={t("Renovated")}
                        status={construction?.renovated}
                        align="horizontal"
                    />
                );
            case "Needs Renovation":
                return (
                    <ListBooleanItem
                        label={t("Needs Renovation")}
                        status={construction?.needsRenovation}
                        align="horizontal"
                    />
                );
            case "Elevator":
                return (
                    <ListBooleanItem
                        label={t("Elevator")}
                        status={construction?.elevator}
                        align="horizontal"
                    />
                );
            case "Internal Stairs":
                return (
                    <ListBooleanItem
                        label={t("Internal Stairs")}
                        status={construction?.internalStairs}
                        align="horizontal"
                    />
                );
            case "Newly Build":
                return (
                    <ListBooleanItem
                        label={t("Newly Built")}
                        status={construction?.newlyBuilt}
                        align="horizontal"
                    />
                );
            case "Incomplete":
                return (
                    <ListBooleanItem
                        label={t("Incomplete")}
                        status={construction?.incomplete}
                        align="horizontal"
                    />
                );
            case "Neoclassical":
                return (
                    <ListBooleanItem
                        label={t("Neoclassical")}
                        status={construction?.neoclassical}
                        align="horizontal"
                    />
                );
            case "Preserved":
                return (
                    <ListBooleanItem
                        label={t("Preserved")}
                        status={construction?.preserved}
                        align="horizontal"
                    />
                );
        }
    };
    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <Paper elevation={10} sx={{ overflow: "auto" }}>
                    <Box
                        sx={{
                            px: 2.5,
                            py: 1,
                            display: "flex",
                            justifyContent: "left",
                        }}
                    >
                        <Typography variant="h6">
                            {t("Construction")}
                        </Typography>
                    </Box>
                    <Divider></Divider>
                    <Grid container>
                        {propertyConstruction(
                            data?.parentCategory.key as ParentCategory
                        )}
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default ConstructionSection;
