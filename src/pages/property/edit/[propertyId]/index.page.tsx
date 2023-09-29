import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { AuthGuard } from "src/components/authentication/auth-guard";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Form from "./Form";
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
import { usePublishTab } from "src/components/Tabs/utils";

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

    const body = useSelector(selectAll);
    // everythingIsClear; we can now setInitialState
    const [everythingIsClear, setEverythingIsClear] = useState(false);

    usePublishTab(
        {
            title: "Create Property",
            path: `/property/edit/${propertyId}`,
        },
        data?.code || `${data?.id}`
    );

    useEffect(() => {
        if (!everythingIsClear) return;
        if (!data) return;

        dispatch(setInitialNotesState(data.notes));
        dispatch(setInitialState(data));
        dispatch(
            setInitialFilesState({
                propertyImages: data?.images,
                propertyBlueprints: data?.blueprints,
            })
        );
    }, [everythingIsClear, data]);

    useEffect(() => {
        getImages(+propertyId!);
        getBlueprints(+propertyId!);
    }, [propertyId]);

    useEffect(() => {
        // clear store before getting data
        resetEverything();
        setEverythingIsClear(true); // prevent race condition between reset and setInitialState
    }, []);

    useEffect(() => {
        if (isEditSuccess) {
            router.push(`/property/${propertyId}`);
        }
    }, [isEditSuccess]);

    const resetEverything = () => {
        dispatch(resetFiles());
        dispatch(resetLabels());
        dispatch(resetNotes());
        dispatch(resetState());
    };

    const performUpload = () => {
        edit({ id: +propertyId!, body: body });
    };

    isEditSuccess && router.push("/");

    const handleCancel = () => {
        router.push(`/property/${propertyId}`);
    };

    return (
        <>
            {everythingIsClear && (
                <Form
                    performUpload={performUpload}
                    resetEverything={resetEverything}
                    handleCancel={handleCancel}
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
