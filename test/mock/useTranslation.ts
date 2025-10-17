import { useTranslation } from "react-i18next";

jest.mock("react-i18next", () => ({
    useTranslation: jest.fn(),
}));

const t = jest.fn((key) => key);

const setupUseTranslationMock = () =>
    (useTranslation as jest.Mock).mockReturnValue({
        t,
        i18n: { language: "en" },
    });

export { setupUseTranslationMock };
