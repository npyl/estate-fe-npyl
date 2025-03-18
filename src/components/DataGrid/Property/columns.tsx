import { Stack, Typography } from "@mui/material";
import { GridCellParams, GridColDef } from "@mui/x-data-grid";
import Image from "@/components/image";
import { KeyValue } from "src/types/KeyValue";
import { TranslationType } from "@/types/translation";
import RenderLabelsCell from "../shared/RenderLabels";
import { useTranslation } from "react-i18next";
import { IProperties, IPropertyResultResponse } from "@/types/properties";
import LinkOffOutlinedIcon from "@mui/icons-material/LinkOffOutlined";
import { getPropertyStatusColor } from "@/theme/colors";
import getParentCategoriesIcons from "@/assets/icons/parent-categories";
import { NormalBadge } from "@/components/Cards/PropertyCard/styled";

function RenderImage(
    params: GridCellParams<IPropertyResultResponse | IProperties>
) {
    const propertyImage = params.row?.propertyImage;
    const isActive = params.row?.active;
    const src =
        typeof propertyImage === "string" ? propertyImage : propertyImage?.url;

    return (
        <Stack
            position="relative"
            width={1}
            height={1}
            alignItems="center"
            justifyContent="center"
        >
            <Image
                src={src}
                alt=""
                ratio="16/9"
                sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                }}
            />

            {!isActive ? (
                <Stack
                    sx={{
                        position: "absolute",
                        top: { xl: 0, lg: 10, xs: 0 },
                        right: -4,
                        zIndex: 5000,
                        width: 23,
                        height: 23,
                        bgcolor: "grey.400",
                        borderRadius: "50%",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <LinkOffOutlinedIcon
                        sx={{ color: "aliceblue", fontSize: 18 }}
                    />
                </Stack>
            ) : null}
        </Stack>
    );
}

function RenderLocation(params: GridCellParams<IPropertyResultResponse>) {
    const { regionEN, regionGR, cityEN, cityGR, complexEN, complexGR } =
        params.row || {};

    const { i18n } = useTranslation();

    const addressParts =
        i18n.language === "en"
            ? [regionEN, cityEN, complexEN]
            : [regionGR, cityGR, complexGR];

    const address = addressParts.filter((part) => part).join(", ");

    return (
        <Stack width={1} height={1} alignItems="center" justifyContent="center">
            <Typography fontSize="small" textAlign="left" whiteSpace="wrap">
                {address}
            </Typography>
        </Stack>
    );
}

function StatusColor(params: GridCellParams) {
    const { t } = useTranslation();

    if (!params.value) return <></>;
    const value = params.value as KeyValue;
    const status = (value.value as string)?.trim();

    if (!value || !status) return <></>;

    const statusForColor = (value.key as string)?.trim();
    const color = getPropertyStatusColor(statusForColor);

    return (
        <Stack
            width={1}
            height={1}
            justifyContent="center"
            alignItems="flex-start"
        >
            <Typography
                bgcolor={color}
                color="white"
                borderRadius="20px"
                px={2.5}
                py={0.6}
                fontSize="small"
            >
                {t(status)}
            </Typography>
        </Stack>
    );
}

//format value number with dots
const formatNumberWithPeriod = (num: any) => {
    if (num === null || num === undefined) {
        return "";
    }
    const numericValue = num.toString().replace(/[^0-9]/g, "");
    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const RenderCodeCell = (params: GridCellParams) => {
    if (!params.value) return null;

    return (
        <Stack width={1} height={1} justifyContent="center" alignItems="center">
            <NormalBadge
                name={`${params.value || ""}`}
                color={"#ffcc00"}
                sx={{
                    color: (theme) =>
                        theme.palette.mode === "light" ? "#854D0E" : "null",
                }}
            />
        </Stack>
    );
};

const RenderParentCategoryCell = (params: GridCellParams) => {
    const { t } = useTranslation();

    const key = (params.value as KeyValue)?.key;
    const value = (params.value as KeyValue)?.value;

    if (!key || !value) return null;

    return (
        <Stack alignItems="center" justifyContent="center" width={1} height={1}>
            <Stack
                direction="row"
                spacing={0.8}
                alignSelf="flex-start"
                alignItems={"center"}
            >
                {getParentCategoriesIcons()[key]}
                <Typography fontSize="small">{t(value)}</Typography>
            </Stack>
        </Stack>
    );
};

const RenderCategoryCell = (params: GridCellParams) => {
    const { t } = useTranslation();

    const value = (params.value as KeyValue)?.value;

    if (!value) return null;

    return (
        <Stack width={1} height={1} justifyContent="center" alignItems="center">
            <Typography
                textAlign="left"
                alignSelf="flex-start"
                whiteSpace="normal"
                fontSize="small"
                sx={{
                    wordBreak: "break-word",
                    maxWidth: "100%",
                }}
            >
                {t(value)}
            </Typography>
        </Stack>
    );
};

//
//  View Properties
//
export const getColumns = (t: TranslationType): GridColDef[] => [
    {
        field: "propertyImage",
        headerName: t("Thumbnail") as string,
        align: "center",
        headerAlign: "left",
        renderCell: RenderImage,
        flex: 1.2,
    },
    {
        field: "code",
        headerName: t("Code") as string,
        headerAlign: "center",
        align: "center",
        renderCell: RenderCodeCell,
        flex: 1,
    },
    {
        field: "parentCategory",
        align: "center",
        headerAlign: "left",
        headerName: t("Parent Category") as string,
        renderCell: RenderParentCategoryCell,
        flex: 1.2,
    },
    {
        field: "category",
        align: "center",
        headerAlign: "left",
        headerName: t("Category") as string,
        renderCell: RenderCategoryCell,
        flex: 1,
    },
    {
        field: "price",
        headerAlign: "left",
        align: "left",
        headerName: t("Price") as string,
        renderCell: (params: GridCellParams) => {
            const formattedPrice = formatNumberWithPeriod(params.value);
            return formattedPrice ? `${formattedPrice} €` : "";
        },

        flex: 0.8,
    },
    {
        field: "state",
        headerAlign: "left",
        align: "left",
        headerName: t("State") as string,
        renderCell: StatusColor,
        flex: 1,
    },
    {
        field: "area",
        headerAlign: "left",
        align: "left",
        headerName: t("Area") as string,
        renderCell: (params: GridCellParams) => {
            return params.value ? `${params.value} m²` : "";
        },
        flex: 0.8,
    },
    {
        field: "labels",
        headerAlign: "left",
        align: "left",
        headerName: t("Labels") as string,
        renderCell: RenderLabelsCell,
        flex: 1,
    },
    {
        field: "location",
        headerAlign: "left",
        align: "left",
        headerName: t("Location") as string,
        renderCell: RenderLocation,
        flex: 1,
    },
];
