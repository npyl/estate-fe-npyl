import { ReactNode, useCallback, useMemo, useRef } from "react";
import {
    FieldValues,
    useForm,
    UseFormHandleSubmit,
    UseFormProps,
    UseFormReturn,
} from "react-hook-form";
import debugLog from "@/_private/debugLog";
import useUnsavedChangesWatcher from "./useUnsavedWatcher";
import { EMPTY_FALLBACK, PROMISE_ERROR } from "./constant";
import dynamic from "next/dynamic";
import useFormCookie from "./useFormCookie";
import quickToast from "./quickToast";
const Notice = dynamic(() => import("./Notice"));

// -----------------------------------------------------------------------------

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
        disablePersist: VoidFunction;
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
 */
function useFormPersist<
    TFieldValues extends FieldValues = FieldValues,
    TContext = any,
    TTransformedValues extends FieldValues | undefined = undefined
>(
    cookieKey: string | null,
    props?: PropsWithoutDefaultValues<TFieldValues, TContext>
): TReturn<TFieldValues, TContext, TTransformedValues> {
    const [cookie, setCookie, removeCookie] =
        useFormCookie<TFieldValues>(cookieKey);

    const values = useMemo(() => {
        if (cookie !== EMPTY_FALLBACK) return cookie;
        return props?.values;
    }, [cookie, props?.values]);

    const formProps = { ...(props || {}), values };

    const methods = useForm<TFieldValues, TContext, TTransformedValues>(
        formProps
    );

    const handleSubmit: UseFormHandleSubmit<TFieldValues, TTransformedValues> =
        useCallback(
            (onValid, onInvalid) => async (e) => {
                /**
                 * Wrapper around passed onValid to await-and-clear cookie after successful submit
                 */
                const onAwaitedValid = async (data: TFieldValues) => {
                    const res = await onValid(data);

                    if (typeof res !== "boolean") {
                        throw new Error(PROMISE_ERROR);
                    }

                    if (res) {
                        debugLog("removing cookie...");
                        disablePersist();
                        removeCookie();
                    }
                };

                return methods.handleSubmit(
                    onAwaitedValid as any,
                    onInvalid
                )(e);
            },
            [methods.handleSubmit]
        );

    // ---------------------------------------------------------------------

    const shouldPersist = useRef(true);
    const disablePersist = useCallback(() => {
        shouldPersist.current = false;
    }, []);

    // ---------------------------------------------------------------------

    // INFO: make sure cookie is not faulty
    const safeCookie = cookie !== EMPTY_FALLBACK ? cookie : values;
    const temporaryChanges = useRef<TFieldValues | undefined>(safeCookie);

    const onExit = useCallback(() => {
        if (!shouldPersist.current) return;

        debugLog("persisting form...");

        const data = temporaryChanges.current;
        if (!data) return;

        setCookie(data);
        quickToast();
    }, []);
    useUnsavedChangesWatcher(onExit);

    // ---------------------------------------------------------------------

    const PersistNotice =
        cookie !== EMPTY_FALLBACK ? (
            <Notice
                values={props?.values}
                temporaryChangesRef={temporaryChanges}
            />
        ) : null;

    return [
        { ...methods, handleSubmit },
        { PersistNotice, disablePersist },
    ] as const;
}

export default useFormPersist;
