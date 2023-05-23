import type { NextPage } from "next";
import { AuthGuard } from "src/components/authentication/auth-guard";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
import { useAddPropertyMutation } from "src/services/properties";

import { useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

import { selectAll } from "src/slices/property";

import Form from "../components/Form";

const CreatePropertyPage: NextPage = () => {
  const [files, setFiles] = useState<(File | string)[]>([]);
  const [fileData, setFileData] = useState<(File | string)[]>([]);
  const body = useSelector(selectAll);
  const [create, { isSuccess }] = useAddPropertyMutation();

  const router = useRouter();

  const handleUpload = () => {
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
    create(dataToSend);
    isSuccess && router.push("/");
  };

  return (
    <div>
      <Form onUpload={handleUpload} />
    </div>
  );
};

CreatePropertyPage.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default CreatePropertyPage;
