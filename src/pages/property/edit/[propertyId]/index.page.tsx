import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { AuthGuard } from "src/components/authentication/auth-guard";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Form from "./components/Form";
import {
    useEditPropertyMutation,
    useLazyGetPropertyBlueprintsQuery,
    useLazyGetPropertyImagesQuery,
} from "src/services/properties";
import { setInitialState, selectAll, resetState } from "src/slices/property";
import {
    resetState as resetFiles,
    setInitialState as setInitialFilesState,
} from "src/slices/property/files";
import { resetState as resetLabels } from "src/slices/labels";
import {
    resetState as resetNotes,
    setInitialState as setInitialNotesState,
} from "src/slices/notes";

import { useGetPropertyByIdQuery } from "src/services/properties";

import { useDispatch } from "react-redux";
import { LogoProgressIndicator } from "src/components/LogoProgressIndicator";
import { IPropertyBlueprint, IPropertyImage } from "src/types/file";

const EditPropertyPage: NextPage = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const { propertyId } = router.query;

    // INFO: lazy is used on * because addImage doesn't cause invalidate (in contradiction to editImage)

    const { data } = useGetPropertyByIdQuery(+propertyId!);
    const [getImages] = useLazyGetPropertyImagesQuery(); // *
    const [getBlueprints] = useLazyGetPropertyBlueprintsQuery(); // *
    const [edit, { isSuccess: isEditSuccess, isLoading: isEditLoading }] =
        useEditPropertyMutation();

    const [images, setImages] = useState<IPropertyImage[]>();
    const [blueprints, setBluprints] = useState<IPropertyBlueprint[]>();

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
        if (!data) return;

        dispatch(setInitialNotesState(data.notes));
        dispatch(setInitialState(data));
    }, [everythingIsClear, data]);

    useEffect(() => {
        if (!everythingIsClear) return;
        if (!images || !blueprints) return;

        dispatch(
            setInitialFilesState({
                propertyImages: images,
                propertyBlueprints: blueprints,
            })
        );
    }, [everythingIsClear, images, blueprints]);

    useEffect(() => {
        // clear store before getting data
        resetEverything();
        setEverythingIsClear(true); // prevent race condition between reset and setInitialState

        getImages(+propertyId!)
            .unwrap()
            .then((response) => setImages(response));
        getBlueprints(+propertyId!)
            .unwrap()
            .then((response) => setBluprints(response));
    }, []);

    const performUpload = () => {
        edit({ id: +propertyId!, body: body });
    };

    isEditSuccess && router.push("/");

    return (
        <>
            {everythingIsClear && (
                <Form
                    performUpload={performUpload}
                    resetEverything={resetEverything}
                />
            )}

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
