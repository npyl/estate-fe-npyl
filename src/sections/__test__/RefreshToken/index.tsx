import useDialog from "@/hooks/useDialog";
import { OPEN_VIEW_BUTTON_TESTID, HIDDEN_VIEW_TESTID } from "./constants";
import {
    useGetData0Query,
    useGetData1Query,
    useGetData2Query,
} from "@/services/__test__/refreshToken";

// Create RTK Query API

const ViewWithHiddenQueries = () => {
    useGetData0Query();
    useGetData1Query();
    useGetData2Query();
    return (
        <div
            data-testid={HIDDEN_VIEW_TESTID}
            style={{ width: 100, height: 100 }}
        />
    );
};

const RefreshTokenSection = () => {
    const [isOpen, open] = useDialog();

    return (
        <>
            <button data-testid={OPEN_VIEW_BUTTON_TESTID} onClick={open} />

            {isOpen ? <ViewWithHiddenQueries /> : null}
        </>
    );
};

export default RefreshTokenSection;
