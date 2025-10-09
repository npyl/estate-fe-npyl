import { useWatch } from "react-hook-form";
import { END_DATE_TESTID, START_DATE_TESTID } from "./constants";
import { FormReq } from "./types";

const Values = () => {
    const startDate = useWatch<FormReq>({ name: "startDate" });
    const endDate = useWatch<FormReq>({ name: "endDate" });

    return (
        <>
            <div data-testid={START_DATE_TESTID}>{startDate}</div>
            <div data-testid={END_DATE_TESTID}>{endDate}</div>
        </>
    );
};

export default Values;
