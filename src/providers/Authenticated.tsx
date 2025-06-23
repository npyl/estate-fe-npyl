import type { FC, PropsWithChildren } from "react";
import DatePickerProvider from "@/providers/DatePicker";
import NotificationsListener from "@/providers/NotificationsListener";
import { NuqsAdapter } from "nuqs/adapters/next/pages";
import NetworkListener from "./NetworkListener";

const AuthenticatedProviders: FC<PropsWithChildren> = ({ children }) => (
    <>
        <NotificationsListener />
        <NetworkListener />

        <NuqsAdapter>
            <DatePickerProvider>{children}</DatePickerProvider>
        </NuqsAdapter>
    </>
);

export default AuthenticatedProviders;
