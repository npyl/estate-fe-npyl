import {
    Button,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    Paper,
    Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { SoftButton } from "src/components/SoftButton";
import { ReactNode, useState } from "react";
import { useTranslation } from "react-i18next";

interface IViewHeaderProps {
    onEdit: VoidFunction;
    onDelete: VoidFunction;
    onClone?: VoidFunction;
    children?: ReactNode;
}

const ViewHeader = (props: IViewHeaderProps) => {
    const { onDelete, onEdit, onClone, children } = props;
    const { t } = useTranslation();
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    return (
        <Paper sx={{ borderColor: "divider", paddingX: 2, marginTop: 1 }}>
            <Grid container direction={"row"}>
                <Grid item flex={1}>
                    {children}
                </Grid>
                <Grid item sx={{ mt: 1, mb: 1 }}>
                    {onClone && (
                        <Button
                            variant="outlined"
                            color="secondary"
                            sx={{ mr: 1 }}
                            onClick={onClone}
                        >
                            {t("Clone")}
                        </Button>
                    )}
                    <Button
                        variant="outlined"
                        color="secondary"
                        sx={{ mr: 1 }}
                        onClick={onEdit}
                    >
                        {t("Edit")}
                    </Button>

                    <SoftButton
                        color="error"
                        onClick={() => setDeleteDialogOpen(true)}
                        startIcon={<DeleteIcon />}
                    >
                        {t("Delete")}
                    </SoftButton>

                    {deleteDialogOpen && (
                        <Dialog
                            maxWidth="xs"
                            open={deleteDialogOpen}
                            onClose={() => setDeleteDialogOpen(false)}
                            closeAfterTransition={true}
                        >
                            <DialogTitle sx={{ textAlign: "center" }}>
                                <HighlightOffIcon
                                    sx={{
                                        fontSize: "100px",
                                        stroke: "Window",
                                        strokeWidth: 1.5,
                                        color: "error.main",
                                    }}
                                />
                            </DialogTitle>
                            <DialogContent sx={{ textAlign: "center" }}>
                                <Typography variant="h5" fontWeight={400}>
                                    {t("Are you sure?")}
                                </Typography>
                            </DialogContent>
                            <DialogContentText
                                ml={3}
                                mr={3}
                                sx={{ textAlign: "center" }}
                            >
                                {t("Do you really want to delete this record?")}
                                <br />
                                {t("This process cannot be undone")}
                            </DialogContentText>
                            <DialogContent sx={{ textAlign: "center" }}>
                                <Button
                                    sx={{ mr: 1 }}
                                    variant="outlined"
                                    color="secondary"
                                    onClick={() => setDeleteDialogOpen(false)}
                                >
                                    {t("No")}
                                </Button>

                                <SoftButton color="error" onClick={onDelete}>
                                    {t("Yes")}
                                </SoftButton>
                            </DialogContent>
                        </Dialog>
                    )}
                </Grid>
            </Grid>
        </Paper>
    );
};

export default ViewHeader;
