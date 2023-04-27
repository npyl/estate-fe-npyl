import type { NextPage } from "next";
import { useRouter } from "next/router";
import { AuthGuard } from "src/components/authentication/auth-guard";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
import { useGetPropertyByIdQuery } from "src/services/properties";

import "photoswipe/dist/photoswipe.css";
import AreaSection from "./components/AreaSection";
import BalconiesSection from "./components/BalconiesSection";
import BasicSection from "./components/BasicSection";
import DetailsSection from "./components/DetailsSection";
import DistanceSection from "./components/DistanceSection";
import HeatingSection from "./components/HeatingSection";
import ImageSection from "./components/ImageSection";
import MainContainer from "./components/MainContainer";
import ParkingsSection from "./components/ParkingsSection";

const SingleProperty: NextPage = () => {
  const router = useRouter();
  const { propertyId } = router.query;

  const { data } = useGetPropertyByIdQuery(parseInt(propertyId as string)); // basic details
  if (!data) {
    return null;
  }

  return (
    <MainContainer
      ImageSection={<ImageSection data={data} />}
      BasicSection={<BasicSection data={data} />}
      DetailsSection={<DetailsSection data={data} />}
      HeatingSection={<HeatingSection data={data} />}
      AreaSection={<AreaSection data={data} />}
      DistanceSection={<DistanceSection data={data} />}
      ParkingsSection={<ParkingsSection data={data} />}
      BalconiesSection={<BalconiesSection data={data} />}
    />
  );
};

SingleProperty.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default SingleProperty;
