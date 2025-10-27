import { dispatch } from "@/store";
import { properties } from "@/services/properties";

// Custom validation function
const codeIsUnique = async (
    initialCode: string | undefined,
    code: string | undefined
): Promise<boolean | string> => {
    if (!code) return true;
    if (initialCode === code) return true;

    try {
        const promise = dispatch(
            properties.endpoints.checkCodeExists.initiate(code)
        );
        const { data: exists } = await promise;
        promise.unsubscribe();
        return exists ? "Code already exists" : true;
    } catch (error) {
        console.error("Error in API call:", error);
        return "Error validating code";
    }
};

// Custom validation function
const keyCodeIsUnique = async (
    initialKeyCode: string | undefined,
    keyCode: string | undefined
): Promise<boolean | string> => {
    if (!keyCode) return true;
    if (initialKeyCode === keyCode) return true;

    try {
        const promise = dispatch(
            properties.endpoints.checkKeyCodeExists.initiate(keyCode)
        );
        const { data: exists } = await promise;
        promise.unsubscribe();
        return exists ? "Key Code already exists" : true;
    } catch (error) {
        console.error("Error in API call:", error);
        return "Error validating key code";
    }
};

export { codeIsUnique, keyCodeIsUnique };
