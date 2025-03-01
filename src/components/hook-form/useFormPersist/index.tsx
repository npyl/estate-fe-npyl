import { ReactNode, useCallback, useMemo, useRef } from "react";
import {
    FieldValues,
    useForm,
    UseFormProps,
    UseFormReturn,
} from "react-hook-form";
import debugLog from "@/_private/debugLog";
import useUnsavedChangesWatcher from "./useUnsavedWatcher";
import { EMPTY_FALLBACK } from "./constant";
import dynamic from "next/dynamic";
import useFormCookie from "./useFormCookie";
import quickToast from "./quickToast";
import useFormMethods from "./useFormMethods";
const Notice = dynamic(() => import("./Notice"));

/**
 * Omit 'defaultValues' from UseFormProps
 */
type PropsWithoutDefaultValues<
    TFieldValues extends FieldValues = FieldValues,
    TContext = any
> = Omit<UseFormProps<TFieldValues, TContext>, "defaultValues">;

type TReturn<
    TFieldValues extends FieldValues = FieldValues,
    TContext = any,
    TTransformedValues extends FieldValues | undefined = undefined
> = [
    UseFormReturn<TFieldValues, TContext, TTransformedValues>,
    {
        PersistNotice: ReactNode;
    }
];

/**
 * Hook for persisting a form to cookie
 *
 * Useful for switching between draft versions (unsaved, e.g. not yet POSTed to Backend) of forms
 *
 * Uses
 * - useCookie
 * - useForm
 *
 * The source of truth for useForm is determined based on the following logic:
 *  1. cookie
 *      If a persisted form is retrieved, this means that the form has not been POSTed to Backend yet
 *      Otherwise, we set a fallback value "EMPTY_FALLBACK" and go to step 2.
 * 2. values
 *      If values are provided, it means we received an edit mode object so we will use that
 *
 * (INFO: defaultValues are ommitted for strict/cleaner use)
 *
 * !IMPORTANT!: If you would like to *prevent* the onExit persist operation call the disablePersist() before any route change or exit
 *
 * !IMPORTANT!: the handleSubmit's onValid callback must be a Promise returning true/false (so that our code knows whether to remove the cookie or not!)
 *
 * @param cookieKey a valid string or null (which will immediately tell us to ignore it)
 * @param onSaveSuccess a callback for the user to do whatever logic *AFTER* our custom submit's onValid has successfully completed!
 *                      This is the proper method to implement things like redirects etc.
 */
function useFormPersist<
    TFieldValues extends FieldValues = FieldValues,
    TContext = any,
    TTransformedValues extends FieldValues | undefined = undefined
>(
    cookieKey: string | null,
    onSaveSuccess: VoidFunction | null,
    props?: PropsWithoutDefaultValues<TFieldValues, TContext>
): TReturn<TFieldValues, TContext, TTransformedValues> {
    const [cookie, setCookie, removeCookie] =
        useFormCookie<TFieldValues>(cookieKey);

    const hasCookie = cookie !== EMPTY_FALLBACK;

    const values = useMemo(() => {
        if (hasCookie) return cookie;
        return props?.values;
    }, [hasCookie, cookie, props?.values]);

    const formProps = { ...(props || {}), values };

    const methods0 = useForm<TFieldValues, TContext, TTransformedValues>(
        formProps
    );

    // ---------------------------------------------------------------------

    const shouldPersist = useRef(true);
    const disablePersist = useCallback(
        () => (shouldPersist.current = false),
        []
    );

    // ---------------------------------------------------------------------

    // INFO: make sure cookie is not faulty
    const safeCookie = hasCookie ? cookie : values;
    const temporaryChanges = useRef<TFieldValues | undefined>(safeCookie);

    const isDirty = methods0.formState.isDirty;

    const onExit = useCallback(() => {
        if (!isDirty) return;
        if (!shouldPersist.current) return;

        const data = temporaryChanges.current;
        if (!data) return;

        debugLog("persisting data: ", temporaryChanges);

        setCookie(data);
        quickToast();
    }, [isDirty]);
    useUnsavedChangesWatcher(onExit);

    // ---------------------------------------------------------------------

    const PersistNotice = hasCookie ? (
        <Notice
            cookieKey={cookieKey}
            values={props?.values}
            temporaryChangesRef={temporaryChanges}
        />
    ) : null;

    // ---------------------------------------------------------------------

    const onChange = useCallback((key: string, value: any) => {
        const old = temporaryChanges.current || props?.values;
        temporaryChanges.current = { ...old, [key]: value } as TFieldValues;
    }, []);
    const onSubmitSuccess = useCallback(() => {
        // INFO: remove form's persisted verion
        debugLog("removing cookie...");
        disablePersist();
        removeCookie();

        // Do things like redirects etc.
        onSaveSuccess?.();
    }, [onSaveSuccess]);
    const methods = useFormMethods(methods0, onChange, onSubmitSuccess);

    return [methods, { PersistNotice }] as const;
}

export default useFormPersist;
