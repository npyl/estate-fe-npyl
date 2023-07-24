import { Grid } from "@mui/material";
import type { NextPage } from "next";
import { useMemo } from "react";
import { AuthGuard } from "src/components/authentication/auth-guard";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
import {
	useCreateLabelForCustomerWithIDMutation,
	useCreateLabelForCustomersMutation,
	useCreateLabelForPropertiesMutation,
	useCreateLabelForPropertyWithIDMutation,
	// General
	useDeletePropertyLabelMutation,
	useDeleteCustomerLabelMutation,
	// Get
	useGetLabelsQuery,
} from "src/services/labels";
import { useAllPropertiesQuery } from "src/services/properties";
import { useAllCustomersQuery } from "src/services/customers";
import { ICustomer } from "src/types/customer";
import { ILabel } from "src/types/label";
import { IProperties } from "src/types/properties";
import { Preview } from "./components/Preview";
import { Create } from "./components/Create";

const SingleProperty: NextPage = () => {
	const propertySectionLabel = "Ακίνητα: ";
	const customerSectionLabel = "Πελάτες: ";

	const [createLabelForPropertyWithID] =
		useCreateLabelForPropertyWithIDMutation();
	const [createLabelForCustomerWithID] =
		useCreateLabelForCustomerWithIDMutation();
	const [createLabelForProperties] = useCreateLabelForPropertiesMutation();
	const [createLabelForCustomers] = useCreateLabelForCustomersMutation();
	const [deleteLabelForProperties] = useDeletePropertyLabelMutation();
	const [deleteLabelForCustomers] = useDeleteCustomerLabelMutation();

	const { data: labels } = useGetLabelsQuery();

	const allProperties: IProperties[] = useAllPropertiesQuery().data || [];
	const allCustomers: ICustomer[] = useAllCustomersQuery().data || [];

	const createLabel = (
		labelName: string,
		autocompleteValue: string,
		pickerColor: string,
		assigneeType: string
	) => {
		const propertyIdForCode = (code: string) => {
			const property = allProperties.find((property) => property.code === code);
			return property?.id;
		};
		const customerIdForFullname = (fullname: string) => {
			const customer = allCustomers.find(
				(customer) => customer.firstName + " " + customer.lastName === fullname
			);
			return customer?.id;
		};

		const code = autocompleteValue;
		const label = { color: pickerColor, name: labelName };

		if (code === "") {
			// create without assign
			if (assigneeType === "property") {
				createLabelForProperties(label);
			} else if (assigneeType === "customer") {
				createLabelForCustomers(label);
			}
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

	const labelData: Record<string, { label: string; data: ILabel[] }> | null =
		useMemo(() => {
			if (!labels) return null;

			return {
				propertyLabels: {
					label: propertySectionLabel,
					data: labels.propertyLabels,
				},
				customerLabels: {
					label: customerSectionLabel,
					data: labels.customerLabels,
				},
			};
		}, [labels]);

	const handleDelete = (resource: string, labelId: number) => {
		resource === propertySectionLabel && deleteLabelForProperties(labelId);
		resource === customerSectionLabel && deleteLabelForCustomers(labelId);
	};

	return (
		<Grid container direction={"row"} gap={1} paddingY={3}>
			<Create createLabel={createLabel} />
			<Preview labelData={labelData} onDelete={handleDelete} />
		</Grid>
	);
};

SingleProperty.getLayout = (page) => (
	<AuthGuard>
		<DashboardLayout>{page}</DashboardLayout>
	</AuthGuard>
);

export default SingleProperty;
