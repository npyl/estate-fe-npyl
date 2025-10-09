import WithNoDragClick from "@/components/Calendar/WithNoDragClick";
import WithDrag from "./WithDrag";
import Container from "./Container";
import WithResize from "./WithResize";

// TODO: remove these "any"
const EventsTarget = WithResize(
    WithDrag(WithNoDragClick(Container) as any) as any
);

export default EventsTarget;
