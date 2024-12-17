import { useCallback } from "react";
import { useAllCustomersQuery } from "src/services/customers";
import { useAllPropertiesQuery } from "src/services/properties";
import {
    labels,
    useCreateLabelForCustomersMutation,
    useCreateLabelForDocumentsMutation,
    useCreateLabelForPropertiesMutation,
    useCreateLabelForResourceMutation,
} from "@/services/labels";
import { dispatch } from "@/store";
import successToast from "@/components/Toaster/success";
import { LabelResourceType } from "@/types/label";

const useCreateLabel = () => {
    const [createAssignLabel] = useCreateLabelForResourceMutation();

    const [createLabelForProperties] = useCreateLabelForPropertiesMutation();
    const [createLabelForCustomers] = useCreateLabelForCustomersMutation();
    const [createLabelForDocuments] = useCreateLabelForDocumentsMutation();

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

    const createLabel = async (
        labelName: string,
        autocompleteValue: string,
        pickerColor: string,
        resource: LabelResourceType
    ) => {
        const code = autocompleteValue;
        const body = { color: pickerColor, name: labelName };

        if (code === "") {
            // create without assign!
            const cb =
                resource === "property"
                    ? createLabelForProperties
                    : resource === "customer"
                    ? createLabelForCustomers
                    : resource === "document"
                    ? createLabelForDocuments
                    : () => {};

            return cb(body);
        } else {
            // create with assign
            const resourceId =
                resource === "property"
                    ? propertyIdForCode(code)
                    : customerIdForFullname(code);

            if (!resourceId) return;

            await createAssignLabel({
                resource,
                resourceId,
                body,
            });

            successToast("Success");
            invalidateTags();
        }
    };

    return { createLabel };
};

export default useCreateLabel;
