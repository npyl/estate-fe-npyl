import { MountResult } from "@playwright/experimental-ct-react";

const injectFiles = async (
    component: MountResult,
    // ...
    INPUT_ID: string,
    FILES: string[]
) => {
    const page = component.page();

    // wait for filechooser
    const fileChooserPromise = page.waitForEvent("filechooser");
    await component.getByTestId(INPUT_ID).click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(FILES);
};

export default injectFiles;
