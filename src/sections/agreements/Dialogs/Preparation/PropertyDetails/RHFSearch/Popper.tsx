import Pagination from "@/components/Pagination";
import { PaginationHookProps } from "@/components/Pagination/types";
import PropertyCard from "@/components/PropertyCard";
import { IPropertyResultResponse } from "@/types/properties";
import { Fab, IconButton, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Popper, { PopperProps } from "@mui/material/Popper";
import { MouseEvent } from "react";
import AddIcon from "@mui/icons-material/Add";
import { getBorderColor2 } from "@/theme/borderColor";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import { SpaceBetween } from "@/components/styled";

const StyledPaper = styled(Paper)(({ theme }) => ({
    border: "1px solid",
    borderColor: getBorderColor2(theme),
    padding: theme.spacing(2),

    zIndex: 3000,
    width: "100%",

    marginTop: theme.spacing(1),
    marginLeft: "auto",
    marginRight: "auto",
}));

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
    const handleCardClick = (e: MouseEvent<HTMLButtonElement>, id: number) => {
        e.stopPropagation();
        onCardClick(id);
    };

    return (
        <Popper {...props} component={StyledPaper}>
            <SpaceBetween mb={2}>
                <Typography>{totalElements} items</Typography>

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
