import { Grid } from "@mui/material";
import type { NextPage } from "next";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { AuthGuard } from "src/components/authentication/auth-guard";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
import { useAllCustomersQuery } from "src/services/customers";
import {
    useCreateLabelForCustomerWithIDMutation,
    useCreateLabelForCustomersMutation,
    useCreateLabelForDocumentsMutation,
    useCreateLabelForPropertiesMutation,
    useCreateLabelForPropertyWithIDMutation,
    // General
    useDeletePropertyLabelMutation,
    useDeleteCustomerLabelMutation,
    useDeleteDocumentLabelMutation,
} from "src/services/labels";
import { useAllPropertiesQuery } from "src/services/properties";
import { ICustomer } from "src/types/customer";
import { LabelResourceType } from "src/types/label";
import { IProperties } from "src/types/properties";
import { Create } from "./components/Create";
import { Edit } from "./components/Edit";
import { Preview } from "./components/Preview";
import { IEditProps } from "./components/types";
import { ConfirmationDialogBox } from "../components/ConfirmationDialogBox";

const LabelsPage: NextPage = () => {
    const { t } = useTranslation();

    const propertySectionLabel = t("Property Labels");
    const customerSectionLabel = t("Customer Labels");
    const documentSectionLabel = t("Document Labels");

    const [editMode, setEditMode] = useState(false);
    const [editedLabel, setEditedLabel] = useState<IEditProps>();

    // TODO: replace with createAssign
    const [createLabelForPropertyWithID] =
        useCreateLabelForPropertyWithIDMutation();
    const [createLabelForCustomerWithID] =
        useCreateLabelForCustomerWithIDMutation();

    //
    //  Mutations
    //
    const [createLabelForProperties] = useCreateLabelForPropertiesMutation();
    const [createLabelForCustomers] = useCreateLabelForCustomersMutation();
    const [createLabelForDocuments] = useCreateLabelForDocumentsMutation();

    const [deleteLabelForProperties] = useDeletePropertyLabelMutation();
    const [deleteLabelForCustomers] = useDeleteCustomerLabelMutation();
    const [deleteLabelForDocuments] = useDeleteDocumentLabelMutation();

    const allProperties: IProperties[] = useAllPropertiesQuery().data || [];
    const allCustomers: ICustomer[] = useAllCustomersQuery().data || [];

    const createLabel = (
        labelName: string,
        autocompleteValue: string,
        pickerColor: string,
        assigneeType: LabelResourceType
    ) => {
        const propertyIdForCode = (code: string) => {
            const property = allProperties.find(
                (property) => property.code === code
            );
            return property?.id;
        };
        const customerIdForFullname = (fullname: string) => {
            const customer = allCustomers.find(
                (customer) =>
                    customer.firstName + " " + customer.lastName === fullname
            );
            return customer?.id;
        };

        const code = autocompleteValue;
        const label = { color: pickerColor, name: labelName };

        if (code === "") {
            // create without assign
            if (assigneeType === "property") createLabelForProperties(label);
            else if (assigneeType === "customer")
                createLabelForCustomers(label);
            else if (assigneeType === "document")
                createLabelForDocuments(label);
        } else {
            // create with assign

            if (assigneeType === "property") {
                const propertyId = propertyIdForCode(code);

                if (!propertyId) return null;

                createLabelForPropertyWithID({
                    propertyId: propertyId,
                    labelBody: label,
                });
            } else if (assigneeType === "customer") {
                const customerId = customerIdForFullname(code);

                if (!customerId) return null;

                createLabelForCustomerWithID({
                    customerId: customerId,
                    labelBody: label,
                });
            }
        }
    };
    const editLabel = ({ id, name, color, resource }: IEditProps) => {
        resource === propertySectionLabel &&
            createLabelForProperties({
                id,
                name,
                color,
            }).then(cancelEdit);

        resource === customerSectionLabel &&
            createLabelForCustomers({
                id,
                name,
                color,
            }).then(cancelEdit);

        resource === documentSectionLabel &&
            createLabelForDocuments({
                id,
                name,
                color,
            }).then(cancelEdit);
    };

    const handleEdit = (props: IEditProps) => {
        setEditedLabel(props);
        setEditMode(true);
    };

    const cancelEdit = () => setEditMode(false);

    const [resource, setResource] = useState<string>("");
    const [labelId, setLabelId] = useState<number>(0);
    const [DeleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);

    const handleDelete = (resource: string, labelId: number) => {
        setResource(resource);
        setLabelId(labelId);
        setDeleteDialogOpen(true);
    };

    const cancelDelete = () => {
        setDeleteDialogOpen(false);
        setResource("");
        setLabelId(0);
    };
    const handleDeleteConfirmation = () => {
        resource === propertySectionLabel &&
            deleteLabelForProperties(labelId).then(cancelEdit);
        resource === customerSectionLabel &&
            deleteLabelForCustomers(labelId).then(cancelEdit);
        resource === documentSectionLabel &&
            deleteLabelForDocuments(labelId).then(cancelEdit);
        cancelDelete();
    };

    return (
        <Grid container direction={"row"} gap={1} paddingY={1}>
            {editMode && editedLabel ? (
                <Edit
                    editedLabel={editedLabel}
                    editLabel={editLabel}
                    cancelEdit={cancelEdit}
                />
            ) : (
                <Create createLabel={createLabel} />
            )}

            <Preview onEdit={handleEdit} onDelete={handleDelete} />
            <ConfirmationDialogBox
                open={DeleteDialogOpen}
                onClose={cancelDelete}
                text={"Are you Sure You want to Delete This Label?"}
                onConfirm={handleDeleteConfirmation}
                action={"delete"}
            />
        </Grid>
    );
};

LabelsPage.getLayout = (page) => (
    <AuthGuard>
        <DashboardLayout>{page}</DashboardLayout>
    </AuthGuard>
);

export default LabelsPage;
