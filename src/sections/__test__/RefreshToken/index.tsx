import useDialog from "@/hooks/useDialog";
import {
    OPEN_VIEW_BUTTON_TESTID,
    HIDDEN_VIEW_TESTID,
    // ...
    FIRSTNAME_TESTID,
    TOTAL_TESTID,
} from "./constants";
import { useAllUsersQuery } from "@/services/user";
import { useGetDashboardQuery } from "@/services/dashboard";

const ViewWithHiddenQueries = () => {
    const { data: users } = useAllUsersQuery();
    const { data: dashboard } = useGetDashboardQuery();

    const firstName = users?.at(0)?.firstName;
    const total = dashboard?.totalProperties ?? -1;

    return (
        <div
            data-testid={HIDDEN_VIEW_TESTID}
            style={{ width: 100, height: 100 }}
        >
            HIDDEN_QUERIES
            {/* ... */}
            {firstName ? (
                <div data-testid={FIRSTNAME_TESTID}>{firstName}</div>
            ) : null}
            {total === -1 ? null : (
                <div data-testid={TOTAL_TESTID}>{total}</div>
            )}
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
