import Guard from "@/components/authentication/_Guard";
import { IUser } from "@/types/user";
import { FC } from "react";

const DIV_TESTID = "div-testid";

interface TesterProps {
    redirectHref?: string;
    allowCb: (u: IUser | null, isAuthenticated: boolean) => boolean;
}

const Tester: FC<TesterProps> = ({ allowCb, redirectHref }) => (
    <Guard allowCb={allowCb} redirectHref={redirectHref}>
        <div data-testid={DIV_TESTID} />
    </Guard>
);

export { DIV_TESTID };
export default Tester;
