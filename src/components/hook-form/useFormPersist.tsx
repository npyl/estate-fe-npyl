import useCookie from "@/hooks/useCookie";
import {
    ComponentType,
    FC,
    useCallback,
    useLayoutEffect,
    useMemo,
    useRef,
} from "react";
import {
    FieldValues,
    FormSubmitHandler,
    SubmitErrorHandler,
    useForm,
    UseFormHandleSubmit,
    UseFormProps,
    UseFormReturn,
} from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import debugLog from "@/_private/debugLog";
import SoftTypography from "../SoftLabel";
import Button from "@mui/material/Button";
import StartIcon from "@mui/icons-material/Start";
import Stack from "@mui/material/Stack";

// -----------------------------------------------------------------------------

interface NoticeProps {}

const Notice: FC<NoticeProps> = () => {
    return (
        <Stack direction="row" spacing={1} alignItems="center">
            <SoftTypography
                width="fit-content"
                p={1}
                borderRadius={1}
                textAlign="right"
            >
                Persisted
            </SoftTypography>
            <Button sx={{ ml: 1 }} startIcon={<StartIcon />}>
                Original
            </Button>
        </Stack>
    );
};

// -----------------------------------------------------------------------------

// Handle browser refresh/close with default prompt
const useBeforeUnload = (cb: (e: BeforeUnloadEvent) => void) => {
    useLayoutEffect(() => {
        window.addEventListener("beforeunload", cb);
        return () => {
            window.removeEventListener("beforeunload", cb);
        };
    }, [cb]);
};

// Handle in-app navigation
const useOnRouteChange = (cb: (url: string) => void) => {
    const router = useRouter();

    useLayoutEffect(() => {
        router.events.on("routeChangeStart", cb);
        return () => {
            router.events.off("routeChangeStart", cb);
        };
    }, [cb]);
};

const useUnsavedChangesWatcher = (onExit: VoidFunction) => {
    const { t } = useTranslation();

    const router = useRouter();

    const handleBeforeUnload = useCallback(() => {
        onExit();
        return "";
    }, [t]);

    const handleRouteChangeStart = useCallback(
        (url: string) => {
            // INFO: same page redirect
            if (url === router.asPath) return;
            onExit();
        },
        [router.asPath]
    );

    useBeforeUnload(handleBeforeUnload);
    useOnRouteChange(handleRouteChangeStart);
};

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
        PersistNotice: ComponentType | null;
        disablePersist: VoidFunction;
    }
];

// ....

const EMPTY_FALLBACK = "EMPTY";

const PROMISE_ERROR =
    "useFormPersist: make sure handleSubmit's onValid callback is a promise returning true/false";

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
    cookieKey: string,
    props?: PropsWithoutDefaultValues<TFieldValues, TContext>
): TReturn<TFieldValues, TContext, TTransformedValues> {
    const [cookie, setCookie, removeCookie] = useCookie<
        TFieldValues | typeof EMPTY_FALLBACK
    >(cookieKey, EMPTY_FALLBACK);

    const values = useMemo(() => {
        if (cookie !== EMPTY_FALLBACK) return cookie;
        return props?.values as TFieldValues;
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

    const onExit = useCallback(() => {
        if (!shouldPersist) return;
        debugLog("persisting form...");
        setCookie(methods.getValues());
    }, []);
    useUnsavedChangesWatcher(onExit);

    // ---------------------------------------------------------------------

    const PersistNotice = cookie !== EMPTY_FALLBACK ? Notice : null;

    return [
        { ...methods, handleSubmit },
        { PersistNotice, disablePersist },
    ] as const;
}

export default useFormPersist;
