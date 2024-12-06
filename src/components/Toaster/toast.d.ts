declare module "react-hot-toast" {
    import { toast as originalToast } from "react-hot-toast";

    export const toast: typeof originalToast & { test: VoidFunction } = {
        test: () => {},
    };
}
