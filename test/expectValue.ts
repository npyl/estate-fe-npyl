import { screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

const expectValue = async (
    ID: string,
    VALUE: string,
    timeout: number = 5000
) => {
    const element = screen.getByTestId(ID);

    // Wait for element to be visible/present in DOM
    await waitFor(
        () => {
            expect(element).toBeInTheDocument();
            expect(element).toHaveTextContent(VALUE);
        },
        { timeout }
    );
};

export default expectValue;
