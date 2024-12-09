import toast from "react-hot-toast";

/**
 * Use this method instead of toast.dismiss() if you want to visually remove a toast faster
 * (under-the-hood it is still the same, just visually faster!)
 *
 * @param id a toast's id
 */
const instantDismiss = (id: string) => {
    toast.dismiss(id);

    const el = document.getElementById(`pp-toast-${id}`);
    if (el) {
        el.style.display = "none";
    }
};

export default instantDismiss;
