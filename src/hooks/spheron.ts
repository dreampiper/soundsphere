import { SpheronClient, ProtocolEnum } from "@spheron/storage";
import { useState } from "react";

interface FileStatus {
  data: {
    Name: string;
    Size: number;
    Hash: string;
  };
}

interface UploadStatus {
  percentage: number;
  fileStatus: FileStatus | null;
}

const useSpheron = () => {
  const [uploadStatuses, setUploadStatuses] = useState<
    Record<string, UploadStatus>
  >({});

  console.log(uploadStatuses);

  const handleUpload = async () => {
    try {
      let currentlyUploaded = 0;

      const response = await fetch("http://localhost:8111/initiate-upload");
      const responseJson = await response.json();
      const uploadResult = await upload([file], {
        token: responseJson.uploadToken,
        onChunkUploaded: (uploadedSize, totalSize) => {
          console.log(uploadedSize);
          currentlyUploaded += uploadedSize;
          console.log(`Uploaded ${currentlyUploaded} of ${totalSize} Bytes.`);
        },
      });
      console.log(uploadResult);

      setUploadLink(uploadResult.protocolLink);
      setDynamicLink(uploadResult.dynamicLinks[0]);
    } catch (err) {
      alert(err);
    } finally {
      setIsLoading(false);
    }
  };

  const uploadFile = async (e: any, key: string) => {
    const progressCallback = (progressData: {
      total: number;
      uploaded: number;
    }) => {
      let percentageDone =
        100 -
        parseFloat((progressData?.total / progressData?.uploaded)?.toFixed(2));
      setUploadStatuses((prevStatuses) => ({
        ...prevStatuses,
        [key]: {
          percentage: percentageDone,
          fileStatus: null,
        },
      }));
    };

    const output = (await lighthouse.upload(
      e,
      process.env.NEXT_PUBLIC_LIGHTHOUSE_API_KEY || "",
      progressCallback
    )) as FileStatus;

    setUploadStatuses((prevStatuses) => ({
      ...prevStatuses,
      [key]: {
        percentage: 100,
        fileStatus: output,
      },
    }));

    console.log(
      "Visit at https://gateway.lighthouse.storage/ipfs/" + output.data.Hash
    );
  };

  return { uploadFile, uploadStatuses };
};

export default useSpheron;
