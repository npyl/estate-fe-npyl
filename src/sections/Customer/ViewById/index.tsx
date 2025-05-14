import { Box, Grid, Stack, Tab, Tabs } from "@mui/material";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import {
    useDeleteCustomerMutation,
    useGetCustomerByIdQuery,
    useGetTasksQuery,
    useSuggestForCustomerQuery,
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
import { usePagination } from "@/components/Pagination";
import CustomerTabCounter from "./TabsCounter/TabCounter";
import { useFilterAgreementsQuery } from "@/services/agreements";
import { IAgreementsFilters } from "@/types/agreements";
// -------------------------------------------------------------------------------
const PAGE_SIZE = 5;

const defaultAgreementsFilter: IAgreementsFilters = {
    variants: null,
    active: null,
    draft: null,
    keys: null,
    signed: null,
    expiresBy: null,
};
const getTabPaths = (id: number) => [`/customer/${id}`, `/customer/edit/${id}`];

// -------------------------------------------------------------------------------

type TabConfig = {
    label: string;
    content: JSX.Element;
};
const ViewById = () => {
    const router = useRouter();
    const { t } = useTranslation();

    const { customerId } = router.query;

    const { data } = useGetCustomerByIdQuery(+customerId!);
    const { data: taskData } = useGetTasksQuery(+customerId!);
    const pagination = usePagination();

    const { data: suggestData } = useSuggestForCustomerQuery(
        {
            customerId: +customerId!,
            page: pagination.page,
            pageSize: PAGE_SIZE,
        },
        {
            skip: +customerId! === -1,
        }
    );

    const { data: agreementsData } = useFilterAgreementsQuery({
        ...defaultAgreementsFilter,
        customerId: +customerId!,
    });

    const matchingProperties = suggestData?.content || [];
    const hasMatchingProperties = matchingProperties.length > 0;

    const [deleteCustomer] = useDeleteCustomerMutation();

    const [value, setValue] = useState(0);

    const isSellerOrLessor = data?.seller || data?.lessor;
    const isBuyerOrLeaser = data?.buyer || data?.leaser;

    const demands = data?.demands;
    const hasDemands = data?.demands?.length && data?.demands?.length > 0;

    const hasTasks = taskData && taskData?.length > 0;

    const ownedProperties = data?.ownedProperties;
    const hasOwnedProperties = ownedProperties && ownedProperties?.length > 0;

    const agreementsCount = agreementsData?.totalElements || 0;

    const handleChange = (_: any, v: number) => setValue(v);
    const handleEdit = () => router.push(`/customer/edit/${customerId}`);
    const handleDelete = useCallback(async () => {
        const res = await deleteCustomer({
            tabPaths: getTabPaths(+customerId!),
            props: +customerId!,
        });
        if ("error" in res) return;
        router.push("/customers");
    }, [customerId]);

    const tabsConfig = [
        {
            label: t("Customer Information"),
            content: (
                <Grid container spacing={1}>
                    <Grid item xs={12} lg={6}>
                        <Information />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        lg={6}
                        // ...
                        display="flex"
                        flexDirection="column"
                        gap={1}
                    >
                        <Address />
                        <Notes />
                    </Grid>
                </Grid>
            ),
        },
        hasTasks && {
            label: (
                <CustomerTabCounter
                    label={t("Tasks")}
                    count={taskData?.length}
                />
            ),
            content: <Tasks cards={taskData} />,
        },

        hasDemands && {
            label: (
                <CustomerTabCounter
                    label={t("Demands")}
                    count={demands?.length}
                />
            ),
            content: (
                <Stack spacing={1}>
                    {demands?.map((d, i) => (
                        <DemandSection key={i} demand={d} index={i} />
                    ))}
                </Stack>
            ),
        },
        isSellerOrLessor &&
            hasOwnedProperties && {
                label: (
                    <CustomerTabCounter
                        label={t("Owned Properties")}
                        count={ownedProperties.length}
                    />
                ),
                content: <OwnedProperties />,
            },
        isBuyerOrLeaser &&
            hasMatchingProperties && {
                label: (
                    <CustomerTabCounter
                        label={t("Matching Properties")}
                        count={matchingProperties.length}
                    />
                ),
                content: <MatchingProperties properties={matchingProperties} />,
            },

        {
            label: (
                <CustomerTabCounter
                    label={t("Agreements")}
                    count={agreementsCount}
                />
            ),

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
