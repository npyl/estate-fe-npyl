import { Grid, Typography, Container } from "@mui/material";
import * as React from "react";
import { useGetCustomerByIdQuery } from "src/services/customers";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import DataGrid from "@/components/DataGrid/Property";
import Panel from "@/components/Panel";

const OwnedCustomerPropertiesSection: React.FC = () => {
    const router = useRouter();
    const { t } = useTranslation();
    const { customerId } = router.query;
    const { data } = useGetCustomerByIdQuery(parseInt(customerId as string)); // basic details

    if (
        !data ||
        !Array.isArray(data.ownedProperties) ||
        data.ownedProperties.length === 0
    ) {
        return (
            <Container
                style={{
                    height: "50vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "top",
                }}
            >
                <Grid
                    container
                    direction="column"
                    alignItems="center"
                    spacing={2}
                >
                    <Grid item>
                        <span style={{ fontSize: "50px" }}>🏠</span>
                    </Grid>
                    <Grid item>
                        <Typography
                            variant="h5"
                            style={{
                                textAlign: "center",
                                color: "rgba(0, 0, 0, 0.7)",
                            }}
                        >
                            {t("There are no owned properties")}
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        );
    }
    // Transform the data
    const transformedData = data.ownedProperties.map((property) => ({
        ...property,
        propertyImageUrl: property.propertyImage?.url,
    }));

    return (
        <Panel
            label={t("Owned Properties")}
            childrenSx={{
                p: 0,
            }}
        >
            <DataGrid
                rows={transformedData}
                resource="property"
                // ...
                sortingBy="firstName"
                sortingOrder={"asc"}
                // ...
                page={0}
                pageSize={10}
                totalRows={25}
            />
        </Panel>
    );
};

export default OwnedCustomerPropertiesSection;
