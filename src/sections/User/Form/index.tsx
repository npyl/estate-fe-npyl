import { Button, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { IUser } from "@/types/user";
import { useAuth } from "@/hooks/use-auth";
import stopPropagation from "@/utils/stopPropagation";
import Form from "./Form";
import Content from "./Content";
import useDialog from "@/hooks/useDialog";
import Dialog from "@/components/Dialog";
import { FC } from "react";

const DeleteButton = () => {
    const { t } = useTranslation();
    const [isOpen, open, close] = useDialog();
    return (
        <>
            <Button onClick={open} color="error" variant="contained">
                <Typography>{t("Delete User")}</Typography>
            </Button>
        </>
    );
};

const ResetButton = () => {
    const { t } = useTranslation();
    const [isOpen, open, close] = useDialog();
    return (
        <>
            <Button onClick={open} color="primary">
                {t("Reset Password")}
            </Button>
        </>
    );
};

{
    /* Delete Dialog */
}
// {openDelete && (
//     <Dialog open={openDelete} onClose={handleCloseDelete}>
//         <DialogTitle>{t("Confirm Deletion")}</DialogTitle>
//         <DialogContent>
//             {t("Are you sure you want to delete the user?")}
//             <FormControl>
//                 <Stack direction={"column"} pt={0.5}>
//                     <Box display="flex" alignItems={"center"}>
//                         <Typography
//                             sx={{ display: "flex" }}
//                             color={"neutral.400"}
//                             variant={"body2"}
//                         >
//                             {t(
//                                 "Select user to transfer properties"
//                             )}
//                             :
//                         </Typography>
//                     </Box>

//                     <Select
//                         labelId="demo-simple-select-label"
//                         value={transferId ?? -1}
//                         onChange={(e) => {
//                             setTransferId(+e.target.value!);
//                         }}
//                         renderValue={(selected) => (
//                             <Typography
//                                 sx={{
//                                     whiteSpace: "nowrap",
//                                     overflow: "hidden",
//                                     textOverflow: "ellipsis",
//                                 }}
//                             >
//                                 {
//                                     users?.find(
//                                         (e) => e.id === selected
//                                     )?.username
//                                 }
//                             </Typography>
//                         )}
//                     >
//                         {users &&
//                             users.length > 0 &&
//                             users.map((user: IUser) => (
//                                 <MenuItem
//                                     key={user.id}
//                                     value={user.id}
//                                 >
//                                     {user.username}
//                                 </MenuItem>
//                             ))}
//                     </Select>
//                 </Stack>
//             </FormControl>
//         </DialogContent>
//         <DialogActions>
//             <Button onClick={handleCloseDelete} color="primary">
//                 {t("Cancel")}
//             </Button>
//             <Button
//                 disabled={isDeleteUserLoading}
//                 onClick={handleDelete}
//                 color="secondary"
//             >
//                 {t("Delete")}
//             </Button>
//         </DialogActions>
//     </Dialog>
// )}

// {openReset && (
//     <Dialog open={openReset} onClose={() => setOpenReset(false)}>
//         <DialogTitle>{t("Reset Password")}</DialogTitle>
//         <Box p={1}>
//             <TextField
//                 label={"Password"}
//                 value={newPassword}
//                 onChange={(e) => setNewPassword(e.target.value)}
//             />
//         </Box>
//         <DialogActions>
//             <Button
//                 onClick={() => setOpenReset(false)}
//                 color="primary"
//             >
//                 {t("Cancel")}
//             </Button>
//             <Button
//                 disabled={isResetLoading}
//                 onClick={handleResetPassword}
//                 color="secondary"
//             >
//                 {t("Reset")}
//             </Button>
//         </DialogActions>
//     </Dialog>
// )}

interface ActionsProps {
    user?: IUser;
    onClose: VoidFunction;
}

const Actions: FC<ActionsProps> = ({ user, onClose }) => {
    const { t } = useTranslation();

    const auth = useAuth();
    const currentUserId = auth.user?.id;

    return (
        <>
            {user && (
                <>
                    <ResetButton />
                    {currentUserId !== user?.id ? <DeleteButton /> : null}
                </>
            )}

            <Button type="submit" variant="contained" color="primary">
                <Typography>{user ? t("Update") : t("Create")}</Typography>
            </Button>
            <Button variant="outlined" onClick={onClose} color="secondary">
                <Typography>{t("Cancel")}</Typography>
            </Button>
        </>
    );
};

interface UserFormProps {
    user?: IUser;
    onClose: () => void;
}

const UserForm = ({ user, onClose }: UserFormProps) => {
    const { t } = useTranslation();

    return (
        <Form user={user} onClose={onClose}>
            <Dialog
                open
                title={t(user ? "User Update" : "Create User")}
                actions={<Actions user={user} onClose={onClose} />}
                content={<Content user={user} />}
                onClose={onClose}
                onClick={stopPropagation}
            />
        </Form>
    );
};

export default UserForm;
