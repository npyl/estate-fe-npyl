import { Box, Grid, Stack, Tab, Tabs } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import {
    useDeleteCustomerMutation,
    useGetCustomerByIdQuery,
} from "@/services/customers";

import {
    Address,
    Information,
    MatchingProperties,
    Notes,
    OwnedProperties,
    Logs,
} from "./sections";
import TabPanel from "@/components/Tabs";
import ViewHeader from "@/sections/ViewHeader";
import { useTranslation } from "react-i18next";
import Agreements from "@/sections/agreements";
import dynamic from "next/dynamic";
const Tasks = dynamic(() => import("./sections/Tasks"));
const DemandSection = dynamic(() => import("./sections/Demand"));

type TabConfig = {
    label: string;
    content: JSX.Element;
};

const ViewById = () => {
    const router = useRouter();
    const { t } = useTranslation();

    const { customerId } = router.query;

    const { data } = useGetCustomerByIdQuery(+customerId!);
    const [deleteCustomer] = useDeleteCustomerMutation();

    const [value, setValue] = useState(0);

    const isSellerOrLessor = data?.seller || data?.lessor;
    const isBuyerOrLeaser = data?.buyer || data?.leaser;

    const demands = data?.demands;
    const hasDemands = data?.demands?.length && data?.demands?.length > 0;

    const handleChange = (_: any, v: number) => setValue(v);
    const handleEdit = () => router.push(`/customer/edit/${customerId}`);
    const handleDelete = () =>
        deleteCustomer(+customerId!).then(() => {
            router.push("/customers");
        });

    const tabsConfig = [
        {
            label: t("Customer Information"),
            content: (
                <Grid container spacing={1}>
                    <Grid item xs={12} lg={6}>
                        <Information />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <Grid container direction="column" spacing={1}>
                            <Grid item>
                                <Address />
                            </Grid>
                            <Grid item>
                                <Notes />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            ),
        },

        {
            label: t("Tasks"),
            content: <Tasks />,
        },

        hasDemands && {
            label: t("Demands"),
            content: (
                <Stack spacing={1}>
                    {demands?.map((d, i) => (
                        <DemandSection key={i} demand={d} index={i} />
                    ))}
                </Stack>
            ),
        },
        isSellerOrLessor && {
            label: t("Owned Properties"),
            content: <OwnedProperties />,
        },
        isBuyerOrLeaser && {
            label: t("Matching Properties"),
            content: <MatchingProperties />,
        },
        {
            label: t("Agreements"),
            content: <Agreements customerId={+customerId!} />,
        },
        {
            label: t("Logs"),
            content: <Logs />,
        },
    ].filter((tab): tab is TabConfig => Boolean(tab));

    return (
        <Box sx={{ width: "100%", paddingTop: 1 }}>
            <ViewHeader
                isProperty={false}
                onEdit={handleEdit}
                onDelete={handleDelete}
            >
                <Tabs value={value} onChange={handleChange}>
                    {tabsConfig.map((tab, index) => (
                        <Tab key={index} label={tab!.label} />
                    ))}
                </Tabs>
            </ViewHeader>

            {tabsConfig.map((tab, index) => (
                <TabPanel key={index} value={value} index={index}>
                    {tab!.content}
                </TabPanel>
            ))}
        </Box>
    );
};

export default ViewById;
