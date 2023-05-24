import lighthouse from "@lighthouse-web3/sdk";
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

const useLightHouse = () => {
  const [uploadStatuses, setUploadStatuses] = useState<
    Record<string, UploadStatus>
  >({});

  console.log(uploadStatuses);

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

export default useLightHouse;
