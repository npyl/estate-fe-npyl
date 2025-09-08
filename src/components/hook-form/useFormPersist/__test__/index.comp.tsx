import { FC, useCallback, useState } from "react";
import useFormPersist, { PropsWithoutDefaultValues } from "..";
import { FormProvider } from "react-hook-form";
import { parseCookies } from "@/test/cookies";

const SUBMIT_ID = "submit-button-testid";
const PAYLOAD_TESTID = "payload-testid";
const STORAGE_KEY = "storage-key";

interface Values {
    something: string;
}

interface TesterProps {
    formProps: PropsWithoutDefaultValues<Values>;
}

const Tester: FC<TesterProps> = ({ formProps }) => {
    const [methods, { PersistNotice }] = useFormPersist<Values>(
        STORAGE_KEY,
        null,
        formProps
    );

    const [payload, setPayload] = useState<Values>();
    const onSubmit = useCallback((d: Values) => {
        setPayload(d);
        return false;
    }, []);

    return (
        <div>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                <FormProvider {...methods}>{PersistNotice}</FormProvider>
                <button type="submit" data-testid={SUBMIT_ID} />
            </form>

            <div data-testid={PAYLOAD_TESTID}>{JSON.stringify(payload)}</div>
        </div>
    );
};

export { STORAGE_KEY, SUBMIT_ID, PAYLOAD_TESTID };
export type { Values };
export default Tester;
