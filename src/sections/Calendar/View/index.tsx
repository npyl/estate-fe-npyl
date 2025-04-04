import CalendarGoogleView from "@/components/CalendarGoogle/View";
import { FC } from "react";
import PopperProvider from "./PopperContext";
import { CalendarGoogleViewProps } from "@/components/CalendarGoogle/types";

const View: FC<CalendarGoogleViewProps> = (props) => (
    <PopperProvider>
        <CalendarGoogleView {...props} />
    </PopperProvider>
);

export default View;
