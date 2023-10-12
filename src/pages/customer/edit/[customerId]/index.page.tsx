// import type { NextPage } from "next";

// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { LogoProgressIndicator } from "src/components/LogoProgressIndicator";
// import { AuthGuard } from "src/components/authentication/auth-guard";
// import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
// import {
//     useEditCustomerMutation,
//     useGetCustomerByIdQuery,
// } from "src/services/customers";
// import { selectAll, setInitialState } from "src/slices/customer";
// import { setInitialState as setInitialNotesState } from "src/slices/notes";
// import { useDispatch } from "src/store";
// import Form from "./components/Form";
// import { useRouter } from "next/router";
// import { useTabsContext } from "src/contexts/tabs";
// import { resetState as resetCustomerState } from "src/slices/customer";
// import { resetState as resetLabelsState } from "src/slices/labels";
// import { resetState as resetNotesState } from "src/slices/notes";

// const EditCustomer: NextPage = () => {
//     const router = useRouter();
//     const dispatch = useDispatch();
//     const { pushTab } = useTabsContext();
//     const { customerId } = router.query;

//     const [everythingIsClear, setEverythingIsClear] = useState(false);

//     const { data } = useGetCustomerByIdQuery(+customerId!);

//     useEffect(() => {
//         if (data && customerId) {
//             pushTab({
//                 path: `/customer/edit/${customerId}`,
//                 id: (customerId + "edit") as string,
//                 label: `Edit customer ${customerId}`,
//             });
//         }
//     }, [data, customerId]);

//     const [
//         edit,
//         {
//             isSuccess: isEditedSuccess,
//             isLoading: isEditedLoading,
//             data: editedCustomer,
//         },
//     ] = useEditCustomerMutation();

//     const body = useSelector(selectAll);

//     useEffect(() => {
//         if (!everythingIsClear || !data) return;

//         dispatch(setInitialNotesState(data.notes));
//         dispatch(setInitialState(data));
//     }, [everythingIsClear, data]);

//     useEffect(() => {
//         if (isEditedSuccess && editedCustomer) {
//             router.push(`/customer/${customerId}`);
//         }
//     }, [isEditedSuccess, editedCustomer]);

//     useEffect(() => {
//         resetState();
//         setEverythingIsClear(true);
//     }, []);

//     const resetState = () => {
//         dispatch(resetCustomerState());
//         dispatch(resetLabelsState());
//         dispatch(resetNotesState());
//     };
//     const handleCancel = () => {
//         router.push(`/customer/${customerId}`);
//     };

//     const performUpload = () => {
//         edit({ customerId: +customerId!, body });
//     };

//     return (
//         <>
//             <Form
//                 performUpload={performUpload}
//                 resetState={resetState}
//                 handleCancel={handleCancel}
//             />

//             {
//                 // loading indicator (incase POST request is taking alot of time)
//                 isEditedLoading && <LogoProgressIndicator />
//             }
//         </>
//     );
// };

// EditCustomer.getLayout = (page) => (
//     <AuthGuard>
//         <DashboardLayout>{page}</DashboardLayout>
//     </AuthGuard>
// );

// export default EditCustomer;

import type { NextPage } from "next";
import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { AuthGuard } from "src/components/authentication/auth-guard";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
import { LogoProgressIndicator } from "src/components/LogoProgressIndicator";
import { useTabsContext } from "src/contexts/tabs";
import {
    useEditCustomerMutation,
    useGetCustomerByIdQuery,
} from "src/services/customers";
import {
    selectAll,
    setInitialState as setInitialCustomerState,
    resetState as resetCustomerState,
} from "src/slices/customer";
import {
    setInitialState as setInitialNotesState,
    resetState as resetNotesState,
} from "src/slices/notes";
import { resetState as resetLabelsState } from "src/slices/labels";
import Form from "./components/Form";

const EditCustomer: NextPage = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { pushTab } = useTabsContext();
    const { customerId } = router.query;

    const bodyRef = useRef(useSelector(selectAll));
    const { data } = useGetCustomerByIdQuery(+customerId!);
    const [edit, { isLoading: isEditLoading }] = useEditCustomerMutation();

    useEffect(() => {
        if (data && customerId) {
            pushTab({
                path: `/customer/edit/${customerId}`,
                id: (customerId + "edit") as string,
                label: `Edit customer ${customerId}`,
            });
            dispatch(setInitialNotesState(data.notes));
            dispatch(setInitialCustomerState(data));
        }
    }, [data, customerId]);
    const resetEverything = () => {
        dispatch(resetCustomerState());
        dispatch(resetLabelsState());
        dispatch(resetNotesState());
    };

    bodyRef.current = useSelector(selectAll);

    useEffect(() => {
        return () => {
            if (bodyRef.current && bodyRef.current.id) {
                edit({ customerId: +customerId!, body: bodyRef.current }).then(
                    () => {
                        resetEverything();
                    }
                );
            }
        };
    }, []);

    const handleRedirect = () => {
        router.push(`/customer/${customerId}`);
    };

    return (
        <>
            <Form
                performUpload={handleRedirect}
                resetState={resetEverything}
                handleCancel={handleRedirect}
            />
            {isEditLoading && <LogoProgressIndicator />}
        </>
    );
};

EditCustomer.getLayout = (page) => (
    <AuthGuard>
        <DashboardLayout>{page}</DashboardLayout>
    </AuthGuard>
);

export default EditCustomer;
