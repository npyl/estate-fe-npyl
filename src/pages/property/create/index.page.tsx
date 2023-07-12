import type { NextPage } from "next";
import { AuthGuard } from "src/components/authentication/auth-guard";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
import { useCreatePropertyMutation } from "src/services/properties";

import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";

import {
  resetState,
  selectCategory,
  selectParentCategory,
} from "src/slices/property";

import Form from "./components/Form";

import { LogoProgressIndicator } from "src/components/LogoProgressIndicator";
import { useEffect } from "react";

const CreatePropertyPage: NextPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [create, { isSuccess, isLoading: isCreateLoading, data: createdPropertyId }] =
    useCreatePropertyMutation();

  const category = useSelector(selectCategory);
  const parentCategory = useSelector(selectParentCategory);

  const handleUpload = () => {
    if (!category || !parentCategory) return;

    // perform POST
    create({ parentCategory: parentCategory, category: category });
  };

  // redirect on success
  isSuccess && 
  createdPropertyId && 
  router.push(`/property/edit/${createdPropertyId}`);

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
