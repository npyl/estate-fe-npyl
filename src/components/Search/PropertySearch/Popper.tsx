import Pagination from "@/components/Pagination";
import { PaginationHookProps } from "@/components/Pagination/types";
import PropertyCard from "@/components/Cards/PropertyCard";
import { IPropertyResultResponse } from "@/types/properties";
import Fab from "@mui/material/Fab";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { ComponentType, MouseEvent } from "react";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { SpaceBetween } from "@/components/styled";
import { useTranslation } from "react-i18next";
import PopoverPaper from "./PopoverPaper";
import { Modal } from "@mui/material";
import { Z_INDEX } from "@/config";

interface ResultsPopperProps {
    anchorEl: HTMLInputElement;
    isLoading: boolean;
    totalElements: number;
    content: IPropertyResultResponse[];
    pagination: PaginationHookProps;
    pageSize: number;

    NoResultsPlaceholder?: ComponentType;

    onCardClick: (p: IPropertyResultResponse) => void;
    onClose: VoidFunction;
}

const ResultsPopper: React.FC<ResultsPopperProps> = ({
    anchorEl,
    content,
    isLoading,
    totalElements,
    pagination,
    pageSize,
    NoResultsPlaceholder,
    onCardClick,
    onClose,
}) => {
    const { t } = useTranslation();

    const handleCardClick = (
        e: MouseEvent<HTMLButtonElement>,
        p: IPropertyResultResponse
    ) => {
        e.stopPropagation();
        onCardClick(p);
    };

    return (
        <Modal
            open
            hideBackdrop
            disableAutoFocus // prevent focus ring
            disableEnforceFocus // prevent search losing focus
            sx={{
                position: "absolute",
                top: anchorEl?.getBoundingClientRect()?.bottom || 0,
                overflowY: "auto",
                overflowX: "hidden",
                zIndex: Z_INDEX.AGREEMENT_FORM + 1,
                px: 1,
            }}
            onClose={onClose}
        >
            <PopoverPaper>
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
                    {content.length === 0 && NoResultsPlaceholder ? (
                        <NoResultsPlaceholder />
                    ) : null}

                    {content.map((p) => (
                        <Grid
                            item
                            key={p.id}
                            xs={12}
                            md={3}
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
                                onClick={(e) => handleCardClick(e, p)}
                            >
                                <AddIcon />
                            </Fab>
                        </Grid>
                    ))}
                </Pagination>
            </PopoverPaper>
        </Modal>
    );
};

export default ResultsPopper;
