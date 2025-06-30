import Content from "./Content";
import FiltersProvider from "./Filters/Context";
import FiltersBar from "./Filters/Bar";
import CreateFab from "@/ui/CreateFab";

const ViewAllPosts = () => (
    <>
        <FiltersProvider>
            <FiltersBar />
            <Content />
        </FiltersProvider>

        <CreateFab href="/blog/create" />
    </>
);

export default ViewAllPosts;
