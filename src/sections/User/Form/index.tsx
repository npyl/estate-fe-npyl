import { useTranslation } from "react-i18next";
import { IUser } from "@/types/user";
import stopPropagation from "@/utils/stopPropagation";
import Form from "./Form";
import Content from "./Content";
import Dialog from "@/components/Dialog";
import Actions from "./Actions";

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
