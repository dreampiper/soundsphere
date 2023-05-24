"use client";
import { uploadButtonEnum } from "@/data/constants";
import { ChangeEvent } from "react";

export default function UploadButton({
  type,
  uploadFile,
}: {
  type: string;
  uploadFile: (e: ChangeEvent<HTMLInputElement>, type: string) => Promise<void>;
}) {
  let component: JSX.Element;

  const uploadCover = () => (
    <button className="relative bg-white flex px-5 py-4 gap-4 rounded-lg justify-between ring-1 ring-slate-900/10 shadow-sm focus:outline-none focus:ring focus:ring-blue-300 focus:border-blue-500">
      <input
        className="absolute opacity-0 w-full h-full left-0 top-0 cursor-pointer"
        name="img"
        type="file"
        accept="image/*"
        onChange={async (e) => await uploadFile(e, "cover")}
      />
      <p className="text-grey-300 text-base font-normal leading-5 tracking-normal text-left">
        Upload an image
      </p>
      <img src="/upload.svg" alt="" />
    </button>
  );

  const uploadSong = () => (
    <button className="relative bg-white flex px-5 py-4 gap-4 rounded-lg justify-between ring-1 ring-slate-900/10 shadow-sm focus:outline-none focus:ring focus:ring-blue-300 focus:border-blue-500">
      <input
        className="absolute opacity-0 w-full h-full left-0 top-0 cursor-pointer"
        name="audio"
        type="file"
        accept="audio/mpeg, audio/wav"
        onChange={async (e) => await uploadFile(e, "song")}
      />
      <p className="text-grey-300 text-base font-normal leading-5 tracking-normal text-left">
        Upload a song
      </p>
      <img src="/upload.svg" alt="" />
    </button>
  );

  switch (type) {
    case uploadButtonEnum.UPLOAD_COVER:
      component = uploadCover();
      break;

    case uploadButtonEnum.UPLOAD_SONG:
      component = uploadSong();
      break;

    default:
      component = <></>;
      break;
  }

  return component;
}
