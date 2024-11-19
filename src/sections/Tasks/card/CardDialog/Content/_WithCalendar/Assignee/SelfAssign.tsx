import { FC, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { googleUserKey } from "./constants";

interface SelfAssignProps {
    userKey?: string;
}

/**
 * When loaded, this component makes sure our hook-form context has the correct (our-own) userKey (since user cannot choose any other!)
 */
const SelfAssign: FC<SelfAssignProps> = ({ userKey }) => {
    const { setValue } = useFormContext();

    useEffect(() => {
        if (!userKey) return; // INFO: this should not happen
        setValue(googleUserKey, userKey, { shouldDirty: true });
    }, []);

    return null;
};

export default SelfAssign;
