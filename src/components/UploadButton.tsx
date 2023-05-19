"use client";
import { uploadButtonEnum } from "@/data/constants";
import { ChangeEvent } from "react";

export default function UploadButton({ type }: { type: string }) {
  let component: JSX.Element;

  const uploadCover = () => {
    return (
      <button className="relative bg-white flex px-5 py-4 gap-4 rounded-lg justify-between">
        <input
          className="absolute opacity-0 w-full h-full left-0 top-0"
          name="img"
          type="file"
          accept="image/*"
          onChange={async (e) => await uploadFile(e, "avatar")}
        />
        <p className="text-[#212226] text-base font-normal leading-5 tracking-normal text-left">
          upload a file
        </p>
        <img src="/upload.svg" alt="" />
      </button>
    );
  };

  const uploadMusic = () => <></>;

  switch (type) {
    case uploadButtonEnum.UPLOAD_COVER:
      component = uploadCover();
      break;

    case uploadButtonEnum.UPLOAD_MUSIC:
      component = uploadMusic();
      break;

    default:
      component = <></>;
      break;
  }

  return component;
}

function uploadFile(
  e: ChangeEvent<HTMLInputElement>,
  arg1: string
): void | PromiseLike<void> {
  throw new Error("Function not implemented.");
}
