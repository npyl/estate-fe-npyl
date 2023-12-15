import {
    Box,
    Button,
    Grid,
    GridProps,
    Paper,
    Typography,
    styled,
} from "@mui/material";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { ILabel } from "src/types/label";
import { Label } from "src/components/label";
import { useGetLabelsQuery } from "src/services/labels";
import { Edit } from "@mui/icons-material";
import { BsTrash } from "react-icons/bs";

interface StyledGridProps extends GridProps {
    editMode: boolean;
    deleteMode: boolean;
}

const StyledGrid = styled(Grid)<StyledGridProps>(
    ({ theme, editMode, deleteMode }) => ({
        borderRadius: "15px",
        "&:hover":
            editMode || deleteMode
                ? {
                      backgroundColor: theme.palette.neutral?.[100] || "#ccc",
                      cursor: "pointer",
                  }
                : {},
        "&:active":
            editMode || deleteMode
                ? {
                      backgroundColor: theme.palette.neutral?.[300] || "#aaa",
                      cursor: "pointer",
                  }
                : {},
    })
);

const getSections = (p: ILabel[], c: ILabel[], d: ILabel[]) => [
    { name: "Propeties", items: p },
    { name: "Customers", items: c },
    { name: "Documents", items: d },
];

interface SectionProps {
    name: string;
    items: ILabel[];
    editMode: boolean;
    deleteMode: boolean;
    onMutate: (id: number) => void;
}

const Section = ({
    name,
    items,
    editMode,
    deleteMode,
    onMutate,
}: SectionProps) => {
    return (
        <Box mb={2}>
            <Typography variant="h6" color={"text.secondary"} mb={2}>
                {name}
            </Typography>
            <Grid container flexWrap={"wrap"}>
                {items?.map((label) => (
                    <StyledGrid
                        key={label.id}
                        xs={3}
                        editMode={editMode}
                        deleteMode={deleteMode}
                        onClick={() =>
                            (editMode || deleteMode) && onMutate(label.id)
                        }
                    >
                        <Label
                            variant="soft"
                            sx={{
                                borderRadius: 7,
                                color: "white",
                                bgcolor: label.color,
                            }}
                        >
                            {label.name}
                        </Label>
                    </StyledGrid>
                ))}
            </Grid>
        </Box>
    );
};

const Preview = () => {
    const { t } = useTranslation();

    const { data: labels } = useGetLabelsQuery();

    const [deleteMode, setDeleteMode] = useState(false);
    const [editMode, setEditMode] = useState(false);

    const sections = useMemo(
        () =>
            getSections(
                labels?.propertyLabels || [],
                labels?.customerLabels || [],
                labels?.documentLabels || []
            ),
        []
    );

    const toggleEdit = () => {
        setDeleteMode(false);
        setEditMode((old) => !old);
    };
    const toggleDelete = () => {
        setEditMode(false);
        setDeleteMode((old) => !old);
    };

    const handleMutate = (id: number) => {};

    return (
        <Paper
            sx={{
                width: "70%",
                minHeight: "500px",
                flexGrow: "0 1",
                p: 3,
                gap: 1,
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Box
                sx={{
                    position: "relative",
                }}
            >
                <Typography
                    variant="h5"
                    gutterBottom
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                    }}
                >
                    {t("Existing Labels")}
                </Typography>

                <Box
                    sx={{
                        position: "absolute",
                        top: 0,
                        right: 2,
                        display: "flex",
                        flexDirection: "row",
                        gap: 1,
                    }}
                >
                    <Button
                        variant={deleteMode ? "contained" : "outlined"}
                        endIcon={deleteMode ? null : <BsTrash />}
                        onClick={toggleDelete}
                    >
                        {deleteMode ? "Deleting" : "Delete"}
                    </Button>
                    <Button
                        variant={editMode ? "contained" : "outlined"}
                        endIcon={editMode ? null : <Edit />}
                        onClick={toggleEdit}
                    >
                        {editMode ? "Editing" : "Edit"}
                    </Button>
                </Box>
            </Box>

            {sections?.map(({ name, items }, i) => (
                <Section
                    key={i}
                    name={name}
                    items={items}
                    editMode={editMode}
                    deleteMode={deleteMode}
                    onMutate={handleMutate}
                />
            ))}
        </Paper>
    );
};

export default Preview;
