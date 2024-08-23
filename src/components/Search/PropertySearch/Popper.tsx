import Pagination from "@/components/Pagination";
import { PaginationHookProps } from "@/components/Pagination/types";
import PropertyCard from "@/components/PropertyCard";
import { IPropertyResultResponse } from "@/types/properties";
import { Fab, IconButton, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Popper, { PopperProps } from "@mui/material/Popper";
import { MouseEvent } from "react";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { SpaceBetween } from "@/components/styled";
import { useTranslation } from "react-i18next";
import { StyledPaper } from "@/components/Share/styled";

interface ResultsPopperProps extends Omit<PopperProps, "content"> {
    isLoading: boolean;
    totalElements: number;
    content: IPropertyResultResponse[];
    pagination: PaginationHookProps;
    pageSize: number;
    onCardClick: (id: number) => void;
    onClose: VoidFunction;
}

const ResultsPopper: React.FC<ResultsPopperProps> = ({
    content,
    isLoading,
    totalElements,
    pagination,
    pageSize,
    onCardClick,
    onClose,
    ...props
}) => {
    const { t } = useTranslation();

    const handleCardClick = (e: MouseEvent<HTMLButtonElement>, id: number) => {
        e.stopPropagation();
        onCardClick(id);
    };

    return (
        <Popper {...props} component={StyledPaper}>
            <SpaceBetween mb={2}>
                <Typography>
                    {totalElements} {t("properties")}
                </Typography>

                <IconButton onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </SpaceBetween>

            <Pagination
                {...pagination}
                isLoading={isLoading}
                pageSize={pageSize}
                totalItems={totalElements}
                // ...
                Container={Grid}
                ContainerProps={{
                    container: true,
                    spacing: 1,
                }}
            >
                {content.map((p) => (
                    <Grid
                        item
                        key={p.id}
                        xs={12}
                        md={6}
                        lg={4}
                        position="relative"
                    >
                        <PropertyCard item={p} selectedMarker={null} />

                        <Fab
                            sx={{
                                position: "absolute",
                                top: -2,
                                right: -4,
                            }}
                            size="small"
                            onClick={(e) => handleCardClick(e, p.id)}
                        >
                            <AddIcon />
                        </Fab>
                    </Grid>
                ))}
            </Pagination>
        </Popper>
    );
};

export default ResultsPopper;
