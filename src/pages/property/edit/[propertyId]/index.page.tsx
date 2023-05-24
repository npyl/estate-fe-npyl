import type { NextPage } from "next";
import React from "react";
import { AuthGuard } from "src/components/authentication/auth-guard";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "../../components/Form";
import {
  useAddPropertyMutation,
  useGetPropertyByIdQuery,
} from "src/services/properties";
import { selectAll, setInitialState } from "src/slices/property";

const EditPropertyPage: NextPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { propertyId } = router.query;
  const { data, isSuccess: fetchedProperty } = useGetPropertyByIdQuery(
    parseInt(propertyId as string)
  );
  const [files, setFiles] = useState<(File | string)[]>([]);
  const [fileData, setFileData] = useState<(File | string)[]>([]);
  const [edit, { isSuccess, data: editedCustomer }] = useAddPropertyMutation();
  const body = useSelector(selectAll);
  useEffect(() => {
    fetchedProperty && dispatch(setInitialState(data));
  }, [fetchedProperty]);

  const performUpload = () => {
    const blob = new Blob([JSON.stringify(body)], {
      type: "application/json",
    });
    let dataToSend = new FormData();
    dataToSend.append(
      "propertyImage ",
      files[0] || new File([""], "", { type: "null" })
    );
    for (let i = 1; i < files.length; i++) {
      dataToSend.append(
        "propertyGallery ",
        files[i] || new File([""], "", { type: "null" })
      );
    }
    dataToSend.append("propertyForm ", blob);
    dataToSend.append(
      "propertyFile ",
      files[0] || new File([""], "", { type: "null" })
    );
    for (let i = 1; i < fileData.length; i++) {
      dataToSend.append(
        "propertyGalleryFiles ",
        files[i] || new File([""], "", { type: "null" })
      );
    }
    dataToSend.append("propertyForm ", blob);

    // perform POST
    edit(dataToSend);
    isSuccess && router.push("/");
  };

  return (
    <div>
      return <Form edit={true} performUpload={performUpload} propertyId={""} />;
    </div>
  );
};

EditPropertyPage.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default EditPropertyPage;
