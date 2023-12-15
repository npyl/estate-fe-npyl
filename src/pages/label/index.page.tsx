import { Grid } from "@mui/material";
import type { NextPage } from "next";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { AuthGuard } from "src/components/authentication/auth-guard";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
import { useAllCustomersQuery } from "src/services/customers";
import {
    useCreateLabelForResourceMutation,
    // general
    useCreateLabelForCustomersMutation,
    useCreateLabelForDocumentsMutation,
    useCreateLabelForPropertiesMutation,
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

    //
    //  Mutations
    //
    const [createAssignLabel] = useCreateLabelForResourceMutation();

    const [createLabelForProperties] = useCreateLabelForPropertiesMutation();
    const [createLabelForCustomers] = useCreateLabelForCustomersMutation();
    const [createLabelForDocuments] = useCreateLabelForDocumentsMutation();

    const [deleteLabelForProperties] = useDeletePropertyLabelMutation();
    const [deleteLabelForCustomers] = useDeleteCustomerLabelMutation();
    const [deleteLabelForDocuments] = useDeleteDocumentLabelMutation();

    const { data: allProperties } = useAllPropertiesQuery();
    const { data: allCustomers } = useAllCustomersQuery();

    const propertyIdForCode = useCallback(
        (code: string) =>
            allProperties?.find((property) => property.code === code)?.id || "",
        [allProperties]
    );

    const customerIdForFullname = useCallback(
        (fullname: string) =>
            allCustomers?.find(
                (customer) =>
                    customer.firstName + " " + customer.lastName === fullname
            )?.id || "",
        [allCustomers]
    );

    const createLabel = (
        labelName: string,
        autocompleteValue: string,
        pickerColor: string,
        resource: LabelResourceType
    ) => {
        const code = autocompleteValue;
        const body = { color: pickerColor, name: labelName };

        if (code === "") {
            // create without assign
            if (resource === "property") createLabelForProperties(body);
            else if (resource === "customer") createLabelForCustomers(body);
            else if (resource === "document") createLabelForDocuments(body);
        } else {
            // create with assign
            const resourceId =
                resource === "property"
                    ? propertyIdForCode(code)
                    : customerIdForFullname(code);

            if (!resourceId) return;

            createAssignLabel({
                resource,
                resourceId,
                body,
            });
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
