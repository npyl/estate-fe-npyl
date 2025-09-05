import GuestGuard from "@/sections/Login/GuestGuard";

const AUTHORIZED_CONTENT_ID = "authorized-content-testid";

const Tester = () => (
    <GuestGuard>
        <div data-testid={AUTHORIZED_CONTENT_ID} />
    </GuestGuard>
);

export { AUTHORIZED_CONTENT_ID };
export default Tester;
