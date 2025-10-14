import { Tab } from "@mui/material";
import { useRouter } from "next/router";
import { ComponentType, FC, useCallback, useMemo } from "react";
import { useDeleteCustomerMutation } from "@/services/customers";
import { MatchingProperties, OwnedProperties, Logs } from "./sections";
import TabPanel from "@/components/Tabs/TabPanel";
import ViewHeader from "@/ui/ViewHeader";
import { useTranslation } from "react-i18next";
import dynamic from "next/dynamic";
import { TranslationType } from "@/types/translation";
import AgreementsTab from "./Tabs/Agreements";
import DemandsTab from "./Tabs/Demands";
import CustomerInformation from "./Tabs/Information";
import TasksLabel from "./TabLabels/Tasks";
import DemandsLabel from "./TabLabels/Demands";
import OwnedPropertiesLabel from "./TabLabels/OwnedProperties";
import MatchingPropertiesLabel from "./TabLabels/MatchingProperties";
import AgreementsLabel from "./TabLabels/Agreements";
import Tabs, { useCurrentTab } from "@/components/Tabs";
import useGetCustomer from "@/sections/Customer/hooks/useGetCustomer";
const Emails = dynamic(() => import("./sections/Emails"));
const Tasks = dynamic(() => import("./sections/Tasks"));

// -------------------------------------------------------------------------------

const getTabPaths = (id: number, b2b: boolean) => {
    const baseUrl = b2b ? "/b2b" : "/customer";
    return [`${baseUrl}/${id}`, `${baseUrl}/edit/${id}`];
};

// -------------------------------------------------------------------------------

interface ITab {
    Label: ComponentType<any> | string;
    View: ComponentType<any>;
}

const WITH = (i: ITab, onOff: boolean) => (onOff ? [i] : []);

const getTABS = (
    t: TranslationType,
    hasDemands: boolean,
    isSellerOrLessor: boolean,
    isBuyerOrLeaser: boolean,
    hasEmail: boolean
): ITab[] => [
    {
        Label: t<string>("Customer Information"),
        View: CustomerInformation,
    },
    {
        Label: TasksLabel,
        View: Tasks,
    },
    ...WITH(
        {
            Label: DemandsLabel,
            View: DemandsTab,
        },
        hasDemands
    ),
    ...WITH(
        {
            Label: OwnedPropertiesLabel,
            View: OwnedProperties,
        },
        isSellerOrLessor
    ),
    ...WITH(
        {
            Label: MatchingPropertiesLabel,
            View: MatchingProperties,
        },
        isBuyerOrLeaser
    ),
    {
        Label: AgreementsLabel,
        View: AgreementsTab,
    },
    ...WITH(
        {
            Label: t<string>("Emails"),
            View: Emails,
        },
        hasEmail
    ),
    {
        Label: t<string>("Logs"),
        View: Logs,
    },
];

const getTab = ({ Label }: ITab, idx: number) => {
    const label = typeof Label === "string" ? Label : <Label />;
    return <Tab key={idx} label={label} />;
};

const getTabView =
    (value: number) =>
    ({ View }: ITab, idx: number) => (
        <TabPanel key={idx} value={value} index={idx}>
            <View />
        </TabPanel>
    );

interface Props {
    b2b?: boolean;
}

const ViewById: FC<Props> = ({ b2b = false }) => {
    const router = useRouter();
    const { t } = useTranslation();

    const { customer: data, customerId } = useGetCustomer();

    const [deleteCustomer] = useDeleteCustomerMutation();

    const [tabIndex] = useCurrentTab();

    const isSellerOrLessor = (data?.seller || data?.lessor) ?? false;
    const isBuyerOrLeaser = (data?.buyer || data?.leaser) ?? false;
    const hasDemands =
        Boolean(data?.demands?.length) && data!.demands!.length > 0;
    const hasEmail = Boolean(data?.email);

    const TABS = useMemo(
        () =>
            getTABS(t, hasDemands, isSellerOrLessor, isBuyerOrLeaser, hasEmail),
        [t, hasDemands, isSellerOrLessor, isBuyerOrLeaser]
    );

    const baseUrl = b2b ? "/b2b" : "/customer";

    const handleEdit = () => router.push(`${baseUrl}/edit/${customerId}`);
    const handleDelete = useCallback(async () => {
        const res = await deleteCustomer({
            tabPaths: getTabPaths(+customerId!, b2b),
            props: +customerId!,
        });
        if ("error" in res) return;
        router.push(baseUrl);
    }, [baseUrl, customerId]);

    return (
        <>
            <ViewHeader isCustomer onEdit={handleEdit} onDelete={handleDelete}>
                <Tabs>{TABS.map(getTab)}</Tabs>
            </ViewHeader>

            {TABS.map(getTabView(tabIndex))}
        </>
    );
};

export default ViewById;
