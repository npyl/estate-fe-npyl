import type { FC, PropsWithChildren } from "react";
import DatePickerProvider from "@/providers/DatePicker";
import NotificationsListener from "@/providers/NotificationsListener";
import DeployListener from "@/providers/DeployListener";
import { NuqsAdapter } from "nuqs/adapters/next/pages";
import NetworkListener from "./NetworkListener";

const AuthenticatedProviders: FC<PropsWithChildren> = ({ children }) => (
    <>
        <DeployListener />
        <NotificationsListener />
        <NetworkListener />

        <NuqsAdapter>
            <DatePickerProvider>{children}</DatePickerProvider>
        </NuqsAdapter>
    </>
);

export default AuthenticatedProviders;
