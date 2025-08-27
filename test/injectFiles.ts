import uuidv4 from "@/utils/uuidv4";
import { fireEvent, screen } from "@testing-library/react";
import fs from "fs/promises";

const getFile = async (p: string) => {
    const data = await fs.readFile(p);
    const blob = new Blob([data as any], { type: "image/png" });
    return new File([blob], uuidv4(), { type: "image/png" });
};

/**
 * Simulates a file upload event on a file input element.
 * @param {string} inputTestId The `data-testid` of the <input type="file" /> element.
 * @param {string[]} paths An array of file paths to be "uploaded".
 */
const injectFiles = async (inputTestId: string, paths: string[]) => {
    const files = await Promise.all(paths.map(getFile));

    const fileInput = screen.getByTestId(inputTestId);

    // The files property of the event target must be a FileList,
    // which is an array-like object.
    Object.defineProperty(fileInput, "files", {
        value: files,
        writable: false,
    });

    // Fire the change event to trigger the component's handler
    fireEvent.change(fileInput);
};

export default injectFiles;
