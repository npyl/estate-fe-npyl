import Tester, {
    SUCCESS_RES,
    UPLOAD_BTN_ID,
    VALUE_ID,
    INPUT_ID,
    // ...
    PERCENTAGE_10_ID,
    PERCENTAGE_10_VALUE,
    PERCENTAGE_30_ID,
    PERCENTAGE_30_VALUE,
    PERCENTAGE_90_ID,
    PERCENTAGE_90_VALUE,
} from "./index.comp";
import path from "path";
import injectFiles from "@/test/injectFiles";
import expectValue from "@/test/expectValue";
import getNetworkControl from "@/test/getNetworkControl";
import {
    ERROR_RESPONSE,
    ERROR_ABORT,
} from "@/ui/useGeneralUploader/useUploadWithProgress";
import { render, screen } from "@testing-library/react";

const projectRoot = path.resolve(__dirname, "../../../../../");

const FILE = path.resolve(projectRoot, "test", "imgs", "img0.png");

const DELAY = 1000 * 60 * 2; // 2mins (in ms)

const mockUrl0 = "http://127.0.0.1:3000/api/__test__/uploadFile";
const mockUrl1 = `${mockUrl0}?slow=${DELAY}`;
const mockUrl2 = `${mockUrl0}?shouldFail=1`;

// ------------------------------------------------------------------------------

describe("useUploadWithProgress", () => {
    /**
     * Successfully upload an image file and track progress (%)
     */
    it(
        "Upload w/ Percentage",
        async () => {
            render(<Tester mockUrl={mockUrl0} />);

            await injectFiles(INPUT_ID, [FILE]);

            // Now click upload button
            screen.getByTestId(UPLOAD_BTN_ID).click();

            // Percentage checks (uncomment when ready)
            await expectValue(PERCENTAGE_10_ID, PERCENTAGE_10_VALUE);
            await expectValue(PERCENTAGE_30_ID, PERCENTAGE_30_VALUE);
            await expectValue(PERCENTAGE_90_ID, PERCENTAGE_90_VALUE);

            // Upload Result
            await expectValue(VALUE_ID, SUCCESS_RES);
        },
        DELAY
    );

    /**
     * Catch a client disconnect during upload (e.g. when internet access is lost)
     */
    it(
        "Disconnect",
        async () => {
            const { goOffline, goOnline } = await getNetworkControl();

            render(<Tester mockUrl={mockUrl1} />);

            await injectFiles(INPUT_ID, [FILE]);

            // Click Upload Button
            screen.getByTestId(UPLOAD_BTN_ID).click();

            // Wait until >=10%
            await expectValue(PERCENTAGE_10_ID, PERCENTAGE_10_VALUE, DELAY);

            goOffline();

            // Upload Result
            await expectValue(VALUE_ID, ERROR_ABORT, DELAY);

            goOnline();
        },
        DELAY * 2
    );

    /**
     * Catch an upload fail
     * This could mean the server rejected the request, e.g. on a timeout
     */
    it(
        "Upload Fail",
        async () => {
            render(<Tester mockUrl={mockUrl2} />);

            await injectFiles(INPUT_ID, [FILE]);

            // Click Upload Button
            screen.getByTestId(UPLOAD_BTN_ID).click();

            // Upload Result
            await expectValue(VALUE_ID, ERROR_RESPONSE);
        },
        DELAY
    );
});
