import { useMemo } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { IAgreementType } from "@/types/agreements";
import { getTRIGGER_OPTIONS } from "./constants/trigger";

//
//  Validates only the pdfme form using trigger()
//
const useValidatePDF = () => {
    const { trigger } = useFormContext();

    const isDraft = useWatch({ name: "draft" });
    const variant = useWatch({ name: "variant" }) as IAgreementType;

    const TRIGGER_OPTIONS = useMemo(
        () => getTRIGGER_OPTIONS(variant),
        [variant]
    );

    const validate = async () => {
        if (isDraft) return true;

        return await trigger(TRIGGER_OPTIONS);
    };

    return { validate };
};

export default useValidatePDF;
