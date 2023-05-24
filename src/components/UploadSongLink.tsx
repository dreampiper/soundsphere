"use client";
import { useRouter } from "next/navigation";

export default function UploadSongLinkButton({ id }: { id: string }) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push(`/explore/${id}/upload-song`)}
      className="relative flex gap-2 justify-center items-center w-max bg-primary-200 text-white p-4 px-5 rounded-[90px]"
    >
      <p className="whitespace-nowrap text-lg font-medium leading-[22px] tracking-normal text-left">
        Upload song
      </p>
      <img src="/upload-light.svg" alt="" />
    </button>
  );
}
