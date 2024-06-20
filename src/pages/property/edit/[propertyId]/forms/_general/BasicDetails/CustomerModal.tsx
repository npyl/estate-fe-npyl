import { Box, IconButton, Modal } from "@mui/material";
import { ClearIcon } from "@mui/x-date-pickers";
interface ModalProps {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const CustomerModal: React.FC<ModalProps> = ({ open, onClose, children }) => {
    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: "absolute",
                    overflow: "auto",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 900,
                    maxHeight: 650,
                    bgcolor: "background.paper",
                    borderRadius: "10px",
                    boxShadow: 24,
                    p: 4,
                }}
            >
                <IconButton
                    onClick={onClose}
                    sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        zIndex: 1,
                    }}
                >
                    <ClearIcon />
                </IconButton>
                {children}
            </Box>
        </Modal>
    );
};

export default CustomerModal;
