import { Box, Grid, Stack, Tab, Tabs } from "@mui/material";
import { useRouter } from "next/router";
import { ComponentType, useCallback, useMemo, useState } from "react";
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
import { TranslationType } from "@/types/translation";
const Tasks = dynamic(() => import("./sections/Tasks"));
const DemandSection = dynamic(() => import("./sections/Demand"));

// -------------------------------------------------------------------------------

const getTabPaths = (id: number) => [`/customer/${id}`, `/customer/edit/${id}`];

// -------------------------------------------------------------------------------

interface ITab {
    label: string;
    View: ComponentType;
}

const WITH = (i: ITab, onOff: boolean) => (onOff ? [i] : []);

const getTABS = (
    t: TranslationType,
    hasDemands: boolean,
    isSellerOrLessor: boolean,
    isBuyerOrLeaser: boolean
): ITab[] => [
    {
        label: t("Customer Information"),
        View: CustomerInformation,
    },
    {
        label: t("Tasks"),
        View: Tasks,
    },
    ...WITH(
        {
            label: t("Demands"),
            View: DemandsTab,
        },
        hasDemands
    ),
    ...WITH(
        {
            label: t("Owned Properties"),
            View: OwnedProperties,
        },
        isSellerOrLessor
    ),
    ...WITH(
        {
            label: t("Matching Properties"),
            View: MatchingProperties,
        },
        isBuyerOrLeaser
    ),
    {
        label: t("Agreements"),
        View: AgreementsTab,
    },
    {
        label: t("Logs"),
        View: Logs,
    },
];

const getTab = ({ label }: ITab, idx: number) => (
    <Tab key={idx} label={label} />
);

const getTabView =
    (value: number) =>
    ({ View }: ITab, idx: number) => (
        <TabPanel value={value} index={idx}>
            <View />
        </TabPanel>
    );

const CustomerInformation = () => (
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
);

const DemandsTab = () => {
    const router = useRouter();
    const { customerId } = router.query;
    const { data } = useGetCustomerByIdQuery(+customerId!);

    const demands = data?.demands;

    return (
        <Stack spacing={1}>
            {demands?.map((d, i) => (
                <DemandSection key={i} demand={d} index={i} />
            ))}
        </Stack>
    );
};

const AgreementsTab = () => {
    const router = useRouter();
    const { customerId } = router.query;
    return <Agreements customerId={+customerId!} />;
};

const ViewById = () => {
    const router = useRouter();
    const { t } = useTranslation();

    const { customerId } = router.query;

    const { data } = useGetCustomerByIdQuery(+customerId!);
    const [deleteCustomer] = useDeleteCustomerMutation();

    const [value, setValue] = useState(0);

    const isSellerOrLessor = (data?.seller || data?.lessor) ?? false;
    const isBuyerOrLeaser = (data?.buyer || data?.leaser) ?? false;
    const hasDemands =
        Boolean(data?.demands?.length) && data!.demands!.length > 0;

    const TABS = useMemo(
        () => getTABS(t, hasDemands, isSellerOrLessor, isBuyerOrLeaser),
        [t, hasDemands, isSellerOrLessor, isBuyerOrLeaser]
    );

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

    return (
        <Box sx={{ width: "100%", paddingTop: 1 }}>
            <ViewHeader
                isProperty={false}
                onEdit={handleEdit}
                onDelete={handleDelete}
            >
                <Tabs value={value} onChange={handleChange}>
                    {TABS.map(getTab)}
                </Tabs>
            </ViewHeader>

            {TABS.map(getTabView(value))}
        </Box>
    );
};

export default ViewById;
