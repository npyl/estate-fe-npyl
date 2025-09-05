import IsReady from "@/components/authentication/_IsReady";

const DIV_TESTID = "div-testid";

const Tester = () => (
    <IsReady>
        <div data-testid={DIV_TESTID} />
    </IsReady>
);

export { DIV_TESTID };
export default Tester;
