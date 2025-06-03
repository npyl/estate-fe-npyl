import { Tab } from "@mui/material";
import { useRouter } from "next/router";
import { ComponentType, FC, useCallback, useMemo, useRef } from "react";
import { MatchingProperties, OwnedProperties, Logs } from "./sections";
import TabPanel from "@/components/Tabs/TabPanel";
import ViewHeader from "@/sections/ViewHeader";
import { useTranslation } from "react-i18next";
import dynamic from "next/dynamic";
import { TranslationType } from "@/types/translation";
import AgreementsTab from "./sections/Agreements";
import CustomerInformation from "./sections/Information";
import TasksLabel from "./TabLabels/Tasks";
import OwnedPropertiesLabel from "./TabLabels/OwnedProperties";
import MatchingPropertiesLabel from "./TabLabels/MatchingProperties";
import AgreementsLabel from "./TabLabels/Agreements";
import Tabs, { useCurrentTab } from "@/components/Tabs";
import {
    useDeleteOrganizationMutation,
    useGetOrganizationQuery,
} from "@/services/organization";
import Opener, { OpenerRef } from "@/components/Opener";
import OrganizationCreateDrawer from "@/sections/Organization/CreateDrawer";
const Emails = dynamic(() => import("./sections/Emails"));
const Tasks = dynamic(() => import("./sections/Tasks"));

// -------------------------------------------------------------------------------

const getTabPaths = (id: number) => [`/organizations/${id}`];

// -------------------------------------------------------------------------------

interface ITab {
    Label: ComponentType<any> | string;
    View: ComponentType<any>;
}

const WITH = (i: ITab, onOff: boolean) => (onOff ? [i] : []);

const getTABS = (
    t: TranslationType,
    isSellerOrLessor: boolean,
    isBuyerOrLeaser: boolean,
    hasEmail: boolean
): ITab[] => [
    {
        Label: t<string>("Organization Information"),
        View: CustomerInformation,
    },
    {
        Label: TasksLabel,
        View: Tasks,
    },

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

interface OrganizationHeaderProps {
    organizationId: number;
}

const OrganizationHeader: FC<OrganizationHeaderProps> = ({
    organizationId,
}) => {
    const { t } = useTranslation();
    const TABS = useMemo(() => getTABS(t, true, true, true), [t]);

    const router = useRouter();
    const { data } = useGetOrganizationQuery(organizationId);

    const openerRef = useRef<OpenerRef>(null);
    const onEdit = useCallback(() => openerRef.current?.open(), []);

    const [deleteOrganization] = useDeleteOrganizationMutation();
    const onDelete = useCallback(async () => {
        const res = await deleteOrganization({
            tabPaths: getTabPaths(organizationId),
            props: +organizationId,
        });
        if ("error" in res) return;
        router.push("/organizations");
    }, [organizationId]);

    return (
        <>
            <ViewHeader isProperty={false} onEdit={onEdit} onDelete={onDelete}>
                <Tabs>{TABS.map(getTab)}</Tabs>
            </ViewHeader>

            <Opener
                ref={openerRef}
                Clicker={() => null}
                onClick={() => {}}
                // ...
                Component={OrganizationCreateDrawer}
                ComponentProps={{
                    organization: data,
                }}
            />
        </>
    );
};

interface ViewByIdProps {
    organizationId: number;
}

const ViewById: FC<ViewByIdProps> = ({ organizationId }) => {
    const { t } = useTranslation();

    const [tabIndex] = useCurrentTab();

    const TABS = useMemo(() => getTABS(t, true, true, true), [t]);

    return (
        <>
            <OrganizationHeader organizationId={organizationId} />
            {TABS.map(getTabView(tabIndex))}
        </>
    );
};

export default ViewById;
