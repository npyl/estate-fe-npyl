import { useSelector } from "react-redux";
import useConditionalRouter from "./Conditional";
import { useCallback, useEffect, useMemo } from "react";
import { NextRouter, useRouter } from "next/router";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";

import { useEditPropertyMutation } from "src/services/properties";
import { useCreateOrUpdateCustomerMutation } from "src/services/customers";
import { Url } from "next/dist/shared/lib/router/router";
import { toast } from "react-toastify";

const infoToast = () => toast.info("Autosaved!");

//
//  Hook that autosaves a property or customer
//
const useSave = (isEditProperty: boolean, isEditCustomer: boolean) => {
    const router = useRouter();
    const { propertyId, customerId } = router.query;

    // const propertyBody = useSelector(propertySelectAll);
    // const customerBody = useSelector(customerSelectAll);

    const [editProperty] = useEditPropertyMutation();
    const [editCustomer] = useCreateOrUpdateCustomerMutation();

    const save = useCallback(() => {
        // if (isEditProperty && propertyBody)
        //     editProperty({ body: propertyBody, id: +propertyId! }).then(
        //         infoToast
        //     );
        // if (isEditCustomer)
        //     editCustomer({ ...customerBody, id: +customerId! }).then(infoToast);
        // // Debug:
        // if (isEditProperty && propertyBody) {
        //     console.log("autosaving property!");
        // } else if (isEditCustomer) {
        //     console.log("autosaving customer!");
        // }
    }, [isEditProperty, isEditCustomer /*, propertyBody, customerBody */]);

    return { save };
};

//
//  Uses the conditional router
//

const useAutosaveRouter = (): NextRouter => {
    const { t } = useTranslation();
    const pathname = usePathname();

    // const body = useSelector(propertySelectAll);

    const isEditProperty = useMemo(
        () => pathname.includes("property/edit"),
        [pathname]
    );
    const isEditCustomer = useMemo(
        () => pathname.includes("customer/edit"),
        [pathname]
    );

    const { save } = useSave(isEditProperty, isEditCustomer);

    //
    //  edit property & code or state empty => cannot redirect
    //
    // const cannotRedirect = useMemo(
    //     () =>
    //         isEditProperty &&
    //         (body?.code?.length === 0 || body?.state?.length === 0),
    //     [isEditProperty, body?.code, body?.state]
    // );

    const cannotRedirect = false;

    const router = useConditionalRouter(
        cannotRedirect,
        t("Fill in Code and State!").toString()
    );

    const push = useCallback(
        (url: Url) => {
            //
            //  autosave if we have edit property/customer
            //
            if ((isEditProperty && !cannotRedirect) || isEditCustomer) {
                save();
            }

            return router.push(url);
        },
        [router, isEditProperty, isEditCustomer, cannotRedirect]
    );

    return { ...router, push };
};

export default useAutosaveRouter;
