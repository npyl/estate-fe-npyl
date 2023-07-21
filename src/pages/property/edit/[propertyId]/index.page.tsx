import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { AuthGuard } from "src/components/authentication/auth-guard";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Form from "./components/Form";
import { useEditPropertyMutation } from "src/services/properties";
import { setInitialState, selectAll, resetState } from "src/slices/property";
import {
	resetState as resetFiles,
	setInitialState as setInitialFilesState,
} from "src/slices/property/files";
import { resetState as resetLabels } from "src/slices/labels";
import {
	resetState as resetNotes,
	selectAll as selectAllNewNotes,
	setInitialState as setInitialNotesState,
} from "src/slices/notes";

import { useGetPropertyByIdQuery } from "src/services/properties";

import { useDispatch } from "react-redux";
import { useAddNoteToPropertyWithIdMutation } from "src/services/note";
import { LogoProgressIndicator } from "src/components/LogoProgressIndicator";

const EditPropertyPage: NextPage = () => {
	const dispatch = useDispatch();
	const router = useRouter();

	const { propertyId } = router.query;

	// everythingIsClear; we can now setInitialState
	const [everythingIsClear, setEverythingIsClear] = useState(false);

	const { data: fetchedProperty, isSuccess: isPropertySuccess } =
		useGetPropertyByIdQuery(parseInt(propertyId as string));

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
	const newNotes = useSelector(selectAllNewNotes);

	const createAndAssignNewNotes = () => {
		// foreach label; call create-for-property-with-id
		newNotes.forEach((newNote) => {
			createNote({
				id: editedPropertyId!,
				dataToSend: newNote,
			});
		});
	};

	const resetEverything = () => {
		dispatch(resetFiles());
		dispatch(resetLabels());
		dispatch(resetNotes());
		dispatch(resetState());
	};

	useEffect(() => {
		if (!everythingIsClear) return;
		if (!fetchedProperty || !isPropertySuccess) return;

		dispatch(
			setInitialFilesState({
				propertyImages: fetchedProperty.images,
				propertyBlueprints: fetchedProperty.blueprints,
			})
		);
		dispatch(setInitialNotesState(fetchedProperty.notes));
		dispatch(setInitialState(fetchedProperty));
	}, [everythingIsClear, fetchedProperty, isPropertySuccess]);

	useEffect(() => {
		if (isEditProperty) {
			createAndAssignNewNotes();
			router.push("/");
		}
	}, [isEditProperty]);

	useEffect(() => {
		// clear store before getting data
		resetEverything();
		setEverythingIsClear(true); // prevent race condition between reset and setInitialState
	}, []);

	const performUpload = () => {
		edit({ id: +propertyId!, body: body });
	};

	return (
		<>
			<Form performUpload={performUpload} resetEverything={resetEverything} />

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
