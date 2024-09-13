import { Grid } from "@mui/material";
import type { NextPage } from "next";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { AuthGuard } from "@/components/authentication/auth-guard";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { useAllCustomersQuery } from "@/services/customers";
import {
    labels,
    // general
    useCreateLabelForCustomersMutation,
    useCreateLabelForDocumentsMutation,
    useCreateLabelForPropertiesMutation,
    useCreateLabelForResourceMutation,
    useDeleteCustomerLabelMutation,
    useDeleteDocumentLabelMutation,
    useDeletePropertyLabelMutation,
} from "src/services/labels";
import { useAllPropertiesQuery } from "@/services/properties";
import { LabelResourceType } from "@/types/label";
import ConfirmationDialogBox from "@/sections/ConfirmationDialogBox";
import { Create } from "./components/Create";
import { Edit } from "./components/Edit";
import { Preview } from "./components/Preview";
import { IEditProps } from "./components/types";

const LabelsPage: NextPage = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

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

    const invalidateTags = () =>
        dispatch(labels.util.invalidateTags(["Labels"]));

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

    const onSuccess = () => {
        toast.success(t("Success"));
        invalidateTags();
    };

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
            }).then(onSuccess);
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
        <>
            <Grid container spacing={1}>
                <Grid item xs={12} md={6}>
                    {editMode && editedLabel ? (
                        <Edit
                            editedLabel={editedLabel}
                            editLabel={editLabel}
                            cancelEdit={cancelEdit}
                        />
                    ) : (
                        <Create createLabel={createLabel} />
                    )}
                </Grid>

                <Grid item xs={12} md={6}>
                    <Preview onEdit={handleEdit} onDelete={handleDelete} />
                </Grid>
            </Grid>

            {DeleteDialogOpen ? (
                <ConfirmationDialogBox
                    open={DeleteDialogOpen}
                    onClose={cancelDelete}
                    text={"Are you Sure You want to Delete This Label?"}
                    onConfirm={handleDeleteConfirmation}
                    action={"delete"}
                />
            ) : null}
        </>
    );
};

LabelsPage.getLayout = (page) => (
    <AuthGuard>
        <DashboardLayout>{page}</DashboardLayout>
    </AuthGuard>
);

export default LabelsPage;
