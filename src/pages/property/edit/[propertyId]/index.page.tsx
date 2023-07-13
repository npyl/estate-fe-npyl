import type { NextPage } from "next";
import { useEffect } from "react";
import { AuthGuard } from "src/components/authentication/auth-guard";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Form from "./components/Form";
import { useEditPropertyMutation } from "src/services/properties";
import { setInitialState, selectAll } from "src/slices/property";
import { setInitialState as setInitialFilesState } from "src/slices/property/files";
import { selectAll as selectAllNewLabels } from "src/slices/labels";
import {
	selectAll as selectAllNewNotes,
	setInitialState as setInitialNotesState,
} from "src/slices/notes";

import { useCreateLabelForPropertyWithIDMutation } from "src/services/labels";

import { useGetPropertyByIdQuery } from "src/services/properties";

import { useDispatch } from "react-redux";
import { useAddNoteToPropertyWithIdMutation } from "src/services/note";
import { LogoProgressIndicator } from "src/components/LogoProgressIndicator";

const EditPropertyPage: NextPage = () => {
	const dispatch = useDispatch();
	const router = useRouter();

	const { propertyId } = router.query;

	const { data: fetchedProperty, isSuccess: isPropertySuccess } =
		useGetPropertyByIdQuery(parseInt(propertyId as string));

	const [createLabel, { isSuccess: isLabelSuccess }] =
		useCreateLabelForPropertyWithIDMutation();
	const [createNote, { isSuccess: isNoteSuccess }] =
		useAddNoteToPropertyWithIdMutation();
	const [
		edit,
		{
			isSuccess: isEditProperty,
			isLoading: isEditLoading,
			data: editedPropertyId,
		},
	] = useEditPropertyMutation();

	const body = useSelector(selectAll);

	const newLabels = useSelector(selectAllNewLabels);
	const newNotes = useSelector(selectAllNewNotes);

	const createAndAssignNewLabels = () => {
		// foreach label; call create-for-property-with-id
		newLabels.forEach((newLabel) => {
			createLabel({
				propertyId: editedPropertyId!,
				labelBody: newLabel,
			});
		});
	};

	const createAndAssignNewNotes = () => {
		// foreach label; call create-for-property-with-id
		newNotes.forEach((newNote) => {
			createNote({
				id: editedPropertyId!,
				dataToSend: newNote,
			});
		});
	};

	useEffect(() => {
		if (isPropertySuccess) {
			dispatch(
				setInitialFilesState({
					propertyImages: [
						fetchedProperty.propertyImage,
						...fetchedProperty.images,
					],
					propertyBlueprints: fetchedProperty.blueprints,
				})
			);
			dispatch(setInitialNotesState(fetchedProperty.notes));
			dispatch(setInitialState(fetchedProperty));
		}
	}, [isPropertySuccess]);

	useEffect(() => {
		if (isEditProperty) {
			createAndAssignNewLabels();
			createAndAssignNewNotes();
			router.push("/");
		}
	}, [isEditProperty]);

	const performUpload = () => {
		edit({ id: +propertyId!, body: body });
	};

	return (
		<>
			<Form edit={true} performUpload={performUpload} />

			{
				// loading indicator (incase POST request is taking alot of time)
				isEditLoading && <LogoProgressIndicator />
			}
		</>
	);
};

EditPropertyPage.getLayout = (page) => (
	<AuthGuard>
		<DashboardLayout>{page}</DashboardLayout>
	</AuthGuard>
);

export default EditPropertyPage;
