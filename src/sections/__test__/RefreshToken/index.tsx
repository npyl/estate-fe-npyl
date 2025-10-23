import useDialog from "@/hooks/useDialog";
import { OPEN_VIEW_BUTTON_TESTID, HIDDEN_VIEW_TESTID } from "./constants";
import { useAllUsersQuery } from "@/services/user";
import { useGetDashboardQuery } from "@/services/dashboard";

const ViewWithHiddenQueries = () => {
    useAllUsersQuery();
    useGetDashboardQuery();
    return (
        <div
            data-testid={HIDDEN_VIEW_TESTID}
            style={{ width: 100, height: 100 }}
        >
            HIDDEN_QUERIES
        </div>
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
