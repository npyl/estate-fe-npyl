import type { NextPage } from "next";
import { AuthGuard } from "src/components/authentication/auth-guard";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
import { useAddPropertyMutation } from "src/services/properties";

import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import { selectAll } from "src/slices/property";

import Form from "./components/Form";

import { LogoProgressIndicator } from "src/components/LogoProgressIndicator";
import { useEffect } from "react";

const CreatePropertyPage: NextPage = () => {
  const router = useRouter();

  const [create, { isSuccess, isLoading: isCreateLoading, data: createdProperty }] =
    useAddPropertyMutation();

  const body = useSelector(selectAll);

  const handleUpload = () => {
    const blob = new Blob([JSON.stringify(body)], {
      type: "application/json",
    });

    let dataToSend = new FormData();
    dataToSend.append("propertyForm ", blob);

    // perform POST
    create(dataToSend);
  };

  useEffect(() => {
    if (!isSuccess || !createdProperty || !createdProperty.id) return;

    router.push(`/property/edit/${createdProperty.id}`);
  }, [isSuccess, createdProperty]);

  return <>
    <Form performUpload={handleUpload} />

    {
      // loading indicator (incase POST request is taking alot of time)
      isCreateLoading && <LogoProgressIndicator />
    }
  </>
};

CreatePropertyPage.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default CreatePropertyPage;
