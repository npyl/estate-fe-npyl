import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { AuthGuard } from "src/components/authentication/auth-guard";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Form from "./components/Form";
import {
	useEditPropertyMutation,
	useGetPropertyBlueprintsQuery,
} from "src/services/properties";
import { setInitialState, selectAll, resetState } from "src/slices/property";
import {
	resetState as resetFiles,
	setInitialState as setInitialFilesState,
	setPropertyBlueprints,
} from "src/slices/property/files";
import { resetState as resetLabels } from "src/slices/labels";
import {
	resetState as resetNotes,
	setInitialState as setInitialNotesState,
} from "src/slices/notes";

import { useGetPropertyByIdQuery } from "src/services/properties";

import { useDispatch } from "react-redux";
import { LogoProgressIndicator } from "src/components/LogoProgressIndicator";

const EditPropertyPage: NextPage = () => {
	const dispatch = useDispatch();
	const router = useRouter();

	const { propertyId } = router.query;

	const { data: fetchedProperty, isSuccess: isPropertySuccess } =
		useGetPropertyByIdQuery(parseInt(propertyId as string));
	const { data: blueprints } = useGetPropertyBlueprintsQuery(+propertyId!);
	const [edit, { isSuccess: isEditSuccess, isLoading: isEditLoading }] =
		useEditPropertyMutation();

	const body = useSelector(selectAll);
	// everythingIsClear; we can now setInitialState
	const [everythingIsClear, setEverythingIsClear] = useState(false);

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
				propertyBlueprints: [],
			})
		);
		dispatch(setInitialNotesState(fetchedProperty.notes));
		dispatch(setInitialState(fetchedProperty));
	}, [everythingIsClear, fetchedProperty, isPropertySuccess]);

	useEffect(() => {
		// clear store before getting data
		resetEverything();
		setEverythingIsClear(true); // prevent race condition between reset and setInitialState
	}, []);

	// blueprints
	useEffect(() => {
		if (!everythingIsClear || !blueprints) return;

		dispatch(setPropertyBlueprints(blueprints));
	}, [everythingIsClear, blueprints]);

	const performUpload = () => {
		edit({ id: +propertyId!, body: body });
	};

	isEditSuccess && router.push("/");

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
