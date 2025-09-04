import RHFDoubleSlider from "@/components/hook-form/dynamic/RHFDoubleSlider";
import RHFAutocomplete from "@/components/hook-form/dynamic/RHFAutocomplete";
import RHFEditor from "@/components/hook-form/dynamic/RHFEditor";
import RHFSelect from "@/components/hook-form/dynamic/RHFSelect";
import RHFTextField from "@/components/hook-form/dynamic/RHFTextField";
import Select from "@/components/hook-form/dynamic/Select";
import { FormProvider, useForm } from "react-hook-form";
import useDialog from "@/hooks/useDialog";
import { FC, useCallback, useMemo } from "react";
import TextField from "@mui/material/TextField";
import { KeyValue } from "@/types/KeyValue";
import plainTextToJSON from "@/components/Editor/util/plainText2JSON";
import MenuItem from "@mui/material/MenuItem";

import "@/_private/JSON";

// --------------------------------------------------------------------------------------

const DYNAMIC_LITERAL = "Dynamic";

type getDynamic<Key> = Key extends string
    ? `${typeof DYNAMIC_LITERAL}${Key}`
    : never;

// --------------------------------------------------------------------------------------

const keys = [
    "sliderMinName",
    "sliderMaxName",
    // ...
    "autocompleteName",
    // ...
    "editorName",
    // ...
    "rhfSelectName",
    // ...
    "textfieldName",
    // ...
    "selectName",
] as const;

type BaseKeys = {
    [Key in (typeof keys)[number]]: any;
};

type DynamicKeys = {
    [Key in keyof BaseKeys as getDynamic<Key>]: any;
};

// ----------------------------------------------------------------------------------------

const ENABLE_DYNAMIC_BUTTON_ID = "enable-dynamic-testid";

const useKeys = () => {
    const [isDynamic, enableDynamic] = useDialog();
    const getKey = useCallback(
        (key: string) => (isDynamic ? `${DYNAMIC_LITERAL}${key}` : key),
        [isDynamic]
    );

    return {
        isDynamic,
        enableDynamic,
        // ...
        sliderMinName: getKey(keys[0]),
        sliderMaxName: getKey(keys[1]),
        autocompleteName: getKey(keys[2]),
        editorName: getKey(keys[3]),
        rhfSelectName: getKey(keys[4]),
        textfieldName: getKey(keys[5]),
        selectName: getKey(keys[6]),
    };
};

// ----------------------------------------------------------------------------------------

const TEST_VALUE0 = "test-value0";
const TEST_VALUE1 = "test-value1";

const VALUES0: BaseKeys = {
    sliderMinName: 1,
    sliderMaxName: 2,
    autocompleteName: TEST_VALUE0,
    editorName: plainTextToJSON(TEST_VALUE0),
    rhfSelectName: TEST_VALUE0,
    textfieldName: TEST_VALUE0,
    selectName: TEST_VALUE0,
};

const VALUES1: DynamicKeys = {
    DynamicsliderMinName: 4,
    DynamicsliderMaxName: 4,
    DynamicautocompleteName: TEST_VALUE1,
    DynamiceditorName: plainTextToJSON(TEST_VALUE1),
    DynamicrhfSelectName: TEST_VALUE1,
    DynamictextfieldName: TEST_VALUE1,
    DynamicselectName: TEST_VALUE1,
};

const getValues = (isDynamic: boolean): BaseKeys | DynamicKeys =>
    isDynamic ? VALUES1 : VALUES0;

// ----------------------------------------------------------------------------------------

const OPTIONS: KeyValue[] = [
    { key: TEST_VALUE0, value: "Test Value 0" },
    { key: TEST_VALUE1, value: "Test Value 1" },
];

const getOption = ({ key, value }: KeyValue) => (
    <MenuItem key={key} value={key}>
        {value}
    </MenuItem>
);

interface RHFSelectTestProps {
    name: string;
    options: KeyValue[];
}

const RHFSelectTest: FC<RHFSelectTestProps> = ({ name, options }) => (
    <RHFSelect name={name} defaultValue="">
        {getOption({ key: "", value: "" })}
        {options.map(getOption)}
    </RHFSelect>
);

// ----------------------------------------------------------------------------------------

const SUBMIT_ID = "submit-testid";

type CurrentKeys<T extends boolean = false> = T extends true
    ? DynamicKeys
    : BaseKeys;

interface TesterProps {
    onSubmit: (d: any) => void;
}

const Tester: FC<TesterProps> = ({ onSubmit }) => {
    const {
        isDynamic,
        enableDynamic,
        // ...
        sliderMinName,
        sliderMaxName,
        autocompleteName,
        editorName,
        rhfSelectName,
        textfieldName,
        selectName,
    } = useKeys();

    const values = useMemo(() => getValues(isDynamic), [isDynamic]);

    const methods = useForm<CurrentKeys<typeof isDynamic>>({ values });

    return (
        <>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                <FormProvider {...methods}>
                    <RHFDoubleSlider
                        minName={sliderMinName}
                        maxName={sliderMaxName}
                    />
                    <RHFAutocomplete
                        name={autocompleteName}
                        renderInput={(params) => <TextField {...params} />}
                        options={[]}
                    />
                    <RHFEditor name={editorName} />
                    <RHFSelectTest name={rhfSelectName} options={OPTIONS} />
                    <RHFTextField name={textfieldName} />
                    <Select
                        name={selectName}
                        label=""
                        options={OPTIONS}
                        defaultValue=""
                    />

                    <button data-testid={SUBMIT_ID} />
                </FormProvider>
            </form>

            <button
                data-testid={ENABLE_DYNAMIC_BUTTON_ID}
                onClick={enableDynamic}
            />
        </>
    );
};

export {
    VALUES0,
    VALUES1,
    // ...
    ENABLE_DYNAMIC_BUTTON_ID,
    SUBMIT_ID,
};
export default Tester;
