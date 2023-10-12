import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { AuthGuard } from "src/components/authentication/auth-guard";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
import {
    useEditPropertyMutation,
    useLazyGetPropertyBlueprintsQuery,
    useLazyGetPropertyImagesQuery,
} from "src/services/properties";
import { resetState as resetLabels } from "src/slices/labels";
import {
    resetState as resetNotes,
    setInitialState as setInitialNotesState,
} from "src/slices/notes";
import { resetState, selectAll, setInitialState } from "src/slices/property";
import {
    resetState as resetFiles,
    setInitialState as setInitialFilesState,
} from "src/slices/property/files";
import Form from "./Form";

import { useGetPropertyByIdQuery } from "src/services/properties";

import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { LogoProgressIndicator } from "src/components/LogoProgressIndicator";
import { useTabsContext } from "src/contexts/tabs";

const EditPropertyPage: NextPage = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { pushTab } = useTabsContext();
    const { propertyId } = router.query;

    // INFO: lazy is used on * because addImage doesn't cause invalidate (in contradiction to editImage)

    const { data } = useGetPropertyByIdQuery(+propertyId!);
    const [getImages, { isSuccess: isNotesSuccess }] =
        useLazyGetPropertyImagesQuery(); // *
    const [getBlueprints, { isSuccess: isBluePrintsSuccess }] =
        useLazyGetPropertyBlueprintsQuery(); // *
    const [edit, { isLoading: isEditLoading }] = useEditPropertyMutation();

    useEffect(() => {
        if (data && propertyId) {
            pushTab({
                path: `/property/edit/${propertyId}`,
                id: (propertyId + "edit") as string,
                label: `New property ${propertyId}`,
            });
            getImages(+propertyId!);
            getBlueprints(+propertyId!);
        }
    }, [data, propertyId]);

    const body = useSelector(selectAll);
    const bodyRef = useRef(body);

    useEffect(() => {
        if (isNotesSuccess && isBluePrintsSuccess && data) {
            dispatch(setInitialNotesState(data.notes));
            dispatch(setInitialState(data));
            dispatch(
                setInitialFilesState({
                    propertyImages: data?.images,
                    propertyBlueprints: data?.blueprints,
                })
            );
        }
    }, [isNotesSuccess, isBluePrintsSuccess, data, propertyId]);

    const resetEverything = () => {
        dispatch(resetFiles());
        dispatch(resetLabels());
        dispatch(resetNotes());
        dispatch(resetState());
    };

    const handleRedirect = () => {
        router.push(`/property/${propertyId}`);
    };

    useEffect(() => {
        bodyRef.current = body;
    }, [body]);

    useEffect(() => {
        return () => {
            if (!bodyRef.current.code) {
                toast.error("Edit operation canceled. Code ID is required");
                return;
            }
            if (!bodyRef.current.state) {
                toast.error("Edit operation canceled. State is required");
                return;
            }

            edit({ id: +propertyId!, body: bodyRef.current }).then(() => {
                // removeTab(propertyId as string);
                resetEverything();
            });
        };
    }, []);

    return (
        <>
            {data && (
                <Form
                    performUpload={handleRedirect}
                    resetEverything={resetEverything}
                    handleCancel={handleRedirect}
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
