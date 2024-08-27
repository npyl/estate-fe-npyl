import { useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { IAgreementType } from "@/types/agreements";
import { getTRIGGER_OPTIONS } from "./constants/trigger";

//
//  Validates only the pdfme form using trigger()
//
const useValidatePDF = () => {
    const { watch, trigger } = useFormContext();

    const isDraft = watch("draft");
    const variant = watch("variant") as IAgreementType;

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
