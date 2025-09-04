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
import useFormStorage from "./useFormStorage";
import quickToast from "./quickToast";
import useFormMethods from "./useFormMethods";
const Notice = dynamic(() => import("./Notice"));

// INFO: prevent state change before redirects
const PASSIVE = true;

/**
 * Omit 'defaultValues' from UseFormProps
 */
type PropsWithoutDefaultValues<
    TFieldValues extends FieldValues = FieldValues,
    TContext = any,
> = Omit<UseFormProps<TFieldValues, TContext>, "defaultValues"> & {
    dialog?: boolean;
};

type TReturn<TFieldValues extends FieldValues = FieldValues, TContext = any> = [
    UseFormReturn<TFieldValues, TContext>,
    {
        PersistNotice: ReactNode;
        persistChanges: VoidFunction;
    },
];

/**
 * Hook for persisting a form to some kind of persistent storage e.g. (currently) localStorage
 *
 * Useful for switching between draft versions (unsaved, e.g. not yet POSTed to Backend) of forms
 * (From now on, everywhere it says 'cookie' we mean storage item)
 *
 * Uses
 * - useLocalStorage
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
 * @param storageKey a valid string or null (which will immediately tell us to ignore it)
 * @param onSaveSuccess a callback for the user to do whatever logic *AFTER* our custom submit's onValid has successfully completed!
 *                      This is the proper method to implement things like redirects etc.
 */
function useFormPersist<
    TFieldValues extends FieldValues = FieldValues,
    TContext = any,
>(
    storageKey: string | null,
    onSaveSuccess: VoidFunction | null,
    _props?: PropsWithoutDefaultValues<TFieldValues, TContext>
): TReturn<TFieldValues, TContext> {
    const { dialog = false, ...props } = _props ?? {};

    const [cookie, setStorage, removeStorage] =
        useFormStorage<TFieldValues>(storageKey);

    const hasStorage = cookie !== EMPTY_FALLBACK;

    const values = useMemo(() => {
        if (hasStorage) return cookie;
        return props?.values;
    }, [hasStorage, cookie, props?.values]);

    const formProps = { ...(props || {}), values };

    const methods0 = useForm<TFieldValues, TContext>(formProps);

    // ---------------------------------------------------------------------

    const shouldPersist = useRef(true);
    const disablePersist = useCallback(
        () => (shouldPersist.current = false),
        []
    );

    // ---------------------------------------------------------------------

    // INFO: make sure cookie is not faulty
    const safeCookie = hasStorage ? cookie : values;
    const temporaryChanges = useRef<TFieldValues | undefined>(safeCookie);

    // INFO: it is important to grab isDirty from methods0 instead of methods
    const isDirty = methods0.formState.isDirty;

    const persistChanges = useCallback(() => {
        if (!isDirty) return;
        if (!shouldPersist.current) return;
        if (!storageKey) return;

        const data = temporaryChanges.current;
        if (!data) return;

        debugLog("persisting data: ", data);

        setStorage(data, PASSIVE);
        quickToast();
    }, [storageKey, isDirty, setStorage]);
    useUnsavedChangesWatcher(persistChanges);

    // ---------------------------------------------------------------------

    const onRemove = useCallback(() => {
        temporaryChanges.current = undefined;
        removeStorage();
    }, [removeStorage]);

    const PersistNotice = hasStorage ? (
        <Notice
            dialog={dialog}
            // ...
            onRemove={onRemove}
            values={props?.values}
            temporaryChangesRef={temporaryChanges}
        />
    ) : null;

    // ---------------------------------------------------------------------

    const onChange = useCallback((key: string, value: any) => {
        const old = temporaryChanges.current ?? props?.values;
        temporaryChanges.current = { ...old, [key]: value } as TFieldValues;
    }, []);
    const onSubmitSuccess = useCallback(() => {
        // INFO: remove form's persisted verion
        debugLog("removing storage...");
        disablePersist();
        removeStorage(PASSIVE);

        // Do things like redirects etc.
        onSaveSuccess?.();
    }, [removeStorage, onSaveSuccess]);
    const methods = useFormMethods(
        hasStorage,
        methods0,
        onChange,
        onSubmitSuccess
    );

    return [methods, { PersistNotice, persistChanges }] as const;
}

export default useFormPersist;
