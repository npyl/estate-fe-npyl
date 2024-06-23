import Pagination from "@/components/Pagination";
import { PaginationHookProps } from "@/components/Pagination/types";
import PropertyCard from "@/components/PropertyCard";
import { IPropertyResultResponse } from "@/types/properties";
import { Fab, IconButton } from "@mui/material";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Popper, { PopperProps } from "@mui/material/Popper";
import { MouseEvent } from "react";
import AddIcon from "@mui/icons-material/Add";

interface ResultsPopperProps extends Omit<PopperProps, "content"> {
    isLoading: boolean;
    totalElements: number;
    content: IPropertyResultResponse[];
    pagination: PaginationHookProps;
    pageSize: number;
    onCardClick: (id: number) => void;
}

const ResultsPopper: React.FC<ResultsPopperProps> = ({
    content,
    isLoading,
    totalElements,
    pagination,
    pageSize,
    onCardClick,
    ...props
}) => {
    const handleCardClick = (e: MouseEvent<HTMLButtonElement>, id: number) => {
        e.stopPropagation();
        onCardClick(id);
    };

    return (
        <Popper
            {...props}
            sx={{
                zIndex: 3000,
                maxWidth: "lg",
                p: 2,
            }}
            component={Paper}
        >
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
