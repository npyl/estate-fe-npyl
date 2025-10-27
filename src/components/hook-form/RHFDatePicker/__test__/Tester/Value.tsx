import { useWatch } from "react-hook-form";
import { VALUE_TESTID } from "./constants";
import { FormReq } from "./types";

const Value = () => {
    const value = useWatch<FormReq>({ name: "myDate" });
    return <div data-testid={VALUE_TESTID}>{value}</div>;
};

export default Value;
