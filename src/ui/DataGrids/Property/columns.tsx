import { Stack, Typography } from "@mui/material";
import { GridCellParams, GridColDef } from "@mui/x-data-grid";
import Image from "@/components/image";
import { KeyValue } from "@/types/KeyValue";
import { TranslationType } from "@/types/translation";
import RenderLabelsCell from "@/ui/DataGrids/shared/RenderLabels";
import { useTranslation } from "react-i18next";
import { IProperties, IPropertyResultResponse } from "@/types/properties";
import LinkOffOutlinedIcon from "@mui/icons-material/LinkOffOutlined";
import { getPropertyStatusColor } from "@/theme/colors";
import getParentCategoriesIcons from "@/assets/icons/parent-categories";
import CodeBadge from "@/ui/Property/CodeBadge";
import { formatThousands } from "@/utils/formatNumber";

const RenderImage = (
    params: GridCellParams<IPropertyResultResponse | IProperties>
) => {
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
                aspectRatio="16/9"
                style={{
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
                        zIndex: 1,
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
};

const RenderLocation = (params: GridCellParams<IPropertyResultResponse>) => {
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
};

const StatusColor = (params: GridCellParams) => {
    const { t } = useTranslation();

    if (!params.value) return <></>;
    const value = params.value as KeyValue;
    const status = value.value?.trim();

    if (!value || !status) return <></>;

    const statusForColor = value.key?.trim();
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
};

const RenderCodeCell = (params: GridCellParams) => {
    const v = params.value as string;
    if (!v) return null;
    return (
        <Stack width={1} height={1} justifyContent="center" alignItems="center">
            <CodeBadge code={v} />
        </Stack>
    );
};

//
//  View Properties
//
export const getColumns = (t: TranslationType): GridColDef[] => [
    {
        field: "propertyImage",
        headerName: t<string>("Thumbnail"),
        align: "center",
        headerAlign: "left",
        renderCell: RenderImage,
        flex: 1.2,
    },
    {
        field: "code",
        headerName: t<string>("Code"),
        headerAlign: "center",
        align: "center",
        renderCell: RenderCodeCell,
        flex: 1,
    },
    {
        field: "category",
        align: "center",
        headerAlign: "left",
        headerName: t<string>("Category"),
        renderCell: (params: GridCellParams) => {
            const parentCategory = params.row?.parentCategory;
            const category = params.row?.category;

            return (
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent={"flex-start"}
                    width={1}
                    height={1}
                >
                    {parentCategory && (
                        <Stack
                            direction="row"
                            spacing={0.5}
                            alignItems="center"
                        >
                            {getParentCategoriesIcons()[parentCategory.key]}
                            <Typography fontSize="small">
                                {t(parentCategory.value)},
                            </Typography>
                            {category && (
                                <Typography
                                    whiteSpace="normal"
                                    fontSize="small"
                                    sx={{
                                        mt: 4,
                                        wordBreak: "break-word",
                                        maxWidth: "100%",
                                    }}
                                >
                                    {t(category.value)}
                                </Typography>
                            )}
                        </Stack>
                    )}
                </Stack>
            );
        },
        flex: 2.2,
    },

    {
        field: "price",
        headerAlign: "left",
        align: "left",
        headerName: t<string>("Price"),
        renderCell: (params: GridCellParams) => {
            const formattedPrice = params.value
                ? formatThousands(params.value as any)
                : "";
            return formattedPrice ? `${formattedPrice} €` : "";
        },

        flex: 0.8,
    },
    {
        field: "state",
        headerAlign: "left",
        align: "left",
        headerName: t<string>("State"),
        renderCell: StatusColor,
        flex: 1,
    },
    {
        field: "area",
        headerAlign: "left",
        align: "left",
        headerName: t<string>("Area"),
        renderCell: (params: GridCellParams) => {
            return params.value ? `${params.value} m²` : "";
        },
        flex: 0.8,
    },
    {
        field: "labels",
        headerAlign: "left",
        align: "left",
        headerName: t<string>("Labels"),
        renderCell: RenderLabelsCell,
        flex: 1,
    },
    {
        field: "location",
        headerAlign: "left",
        align: "left",
        headerName: t<string>("Location"),
        renderCell: RenderLocation,
        flex: 1,
    },
];
