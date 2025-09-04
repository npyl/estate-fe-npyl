import type { FC, PropsWithChildren } from "react";
import AuthGuard from "./auth-guard";
import Guard from "./_Guard";
import { IUser } from "@/types/user";

const ADMIN_GUARD_TESTID = "admin-guard-testid";

const allowCb = (u: IUser | null) => Boolean(u?.isAdmin);

const AdminGuard: FC<PropsWithChildren> = ({ children }) => (
    <AuthGuard>
        <Guard allowCb={allowCb}>
            {/* INFO: if this div is found it means admin content is authorized */}
            <div data-testid={ADMIN_GUARD_TESTID} />
            {children}
        </Guard>
    </AuthGuard>
);

export { ADMIN_GUARD_TESTID };
export default AdminGuard;
