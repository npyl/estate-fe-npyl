import Tester from "@/sections/__test__/StayUpdated";
import { NextPage } from "next";

// INFO: prevent from showing up on production
export const getStaticProps = async () => {
    if (process.env.NODE_ENV === "production") {
        return { notFound: true };
    }
    return { props: {} };
};

const StayUpdated: NextPage = () => <Tester />;

export default StayUpdated;
