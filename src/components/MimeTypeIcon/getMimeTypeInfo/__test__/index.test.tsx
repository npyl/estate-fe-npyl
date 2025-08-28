import getMimetypeInfo, {
    PDF_COLOR,
    BASIC_IMAGE_COLOR,
    FALLBACK_COLOR,
} from "@/components/MimeTypeIcon/getMimeTypeInfo";
import { PictureAsPdf, Image, InsertDriveFile } from "@mui/icons-material";

// Mock Material-UI icons with test IDs as constants
const MOCK_PDF_ICON_ID = "pdf-icon";
const MOCK_IMAGE_ICON_ID = "image-icon";
const MOCK_FILE_ICON_ID = "file-icon";

jest.mock("@mui/icons-material", () => ({
    PictureAsPdf: () => <div data-testid={MOCK_PDF_ICON_ID} />,
    Image: () => <div data-testid={MOCK_IMAGE_ICON_ID} />,
    InsertDriveFile: () => <div data-testid={MOCK_FILE_ICON_ID} />,
}));

describe("getMimetypeInfo", () => {
    test("exact", () => {
        const result = getMimetypeInfo("application/pdf");
        expect(result.Icon).toBe(PictureAsPdf);
        expect(result.color).toBe(PDF_COLOR);
    });

    test("category", () => {
        const result = getMimetypeInfo("image/unknown");
        expect(result.Icon).toBe(Image);
        expect(result.color).toBe(BASIC_IMAGE_COLOR);
    });

    test("fallback", () => {
        const result = getMimetypeInfo("unknown/unknown");
        expect(result.Icon).toBe(InsertDriveFile);
        expect(result.color).toBe(FALLBACK_COLOR);
    });
});
