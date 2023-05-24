"use client";
import useLightHouse from "@/hooks/lighthouse";
import { usePolybase } from "@/hooks/polybase";
import * as Form from "@radix-ui/react-form";
import { usePathname } from "next/navigation";
import { FormEvent, useState } from "react";

import ProfileNav from "@/components/ProfileNav";
import UploadButton from "@/components/UploadButton";
import { uploadButtonEnum } from "@/data/constants";
import useSoundSphereContract from "@/hooks/soundSphereContract";
import { store } from "@/store/store";
import { Address } from "wagmi";

export default function UploadSong() {
  const { registerArtist } = useSoundSphereContract();
  const pathname = usePathname();
  const { uploadFile, uploadStatuses } = useLightHouse();
  const { addSong, getUserRecord, addDAOToArtistCommunities, getCommunities } =
    usePolybase();

  const userId = store.getState().userId;

  const [name, setName] = useState("");
  const [artist, setArtist] = useState("");
  const [description, setDescription] = useState("");
  const [artistAccountAddress, setArtistAccountAddress] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    if (!userId) return;

    const cleanPath = pathname.split("#")[0].split("?")[0];
    var segments = cleanPath.split("/");
    var communityId = segments[segments.length - 2];

    const user = await getUserRecord(userId);
    const communities = await getCommunities([communityId]);
    const community = communities[0];

    const { artistCommunitiesId } = user;

    console.log(community.daoAccountAddress);

    if (!artistCommunitiesId.includes(communityId)) {
      addDAOToArtistCommunities({ userId, daoId: communityId });
      const { write } = registerArtist;

      write?.({
        args: [
          artistAccountAddress as Address,
          community.daoAccountAddress as Address,
        ],
      });
    }

    await addSong({
      name,
      artist,
      artistAccountAddress,
      fromDAO: communityId,
      description,
      coverImage: uploadStatuses["cover"]?.fileStatus?.data.Hash || "",
      songUrl: uploadStatuses["song"]?.fileStatus?.data.Hash || "",
      communityId,
    });

    alert("Song uploaded successfully");

    // toastRef.current && toastRef.current.callToast();
  }

  return (
    <>
      <ProfileNav>
        <h1 className="text-text-secondary text-2xl font-bold leading-[29px] tracking-normal text-left">
          Upload Song
        </h1>
      </ProfileNav>

      <div className="w-full">
        <Form.Root
          onSubmit={handleSubmit}
          className="flex flex-col gap-8 max-w-[460px] w-full"
        >
          <Form.Field className="flex flex-col gap-2" name="song-name">
            <div className="flex justify-between items-center">
              <Form.Label className="text-white text-base font-medium leading-5 tracking-normal text-left">
                Song Name
              </Form.Label>
              <Form.Message
                className="text-[13px] text-white opacity-[0.8]"
                match="valueMissing"
              >
                This field is required
              </Form.Message>
            </div>

            <Form.Control asChild>
              <input
                className="w-full py-3 px-3 ring-1 ring-slate-900/10 text-slate-500 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300 focus:border-blue-500 dark:bg-slate-800 dark:ring-0 dark:highlight-white/5 dark:text-slate-400 dark:focus:ring dark:focus:ring-blue-300"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Control>
          </Form.Field>

          <Form.Field className="flex flex-col gap-2" name="artist">
            <div className="flex justify-between items-center">
              <Form.Label className="text-white text-base font-medium leading-5 tracking-normal text-left">
                Artist
              </Form.Label>
              <Form.Message
                className="text-[13px] text-white opacity-[0.8]"
                match="valueMissing"
              >
                Please enter the artist name
              </Form.Message>
            </div>

            <Form.Control asChild>
              <input
                className="w-full py-3 px-3 ring-1 ring-slate-900/10 text-slate-500 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300 focus:border-blue-500 dark:bg-slate-800 dark:ring-0 dark:highlight-white/5 dark:text-slate-400 dark:focus:ring dark:focus:ring-blue-300"
                required
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
              />
            </Form.Control>
          </Form.Field>

          <Form.Field className="flex flex-col gap-2" name="artist">
            <div className="flex justify-between items-center">
              <Form.Label className="text-white text-base font-medium leading-5 tracking-normal text-left">
                Artist Account Address
              </Form.Label>
              <Form.Message
                className="text-[13px] text-white opacity-[0.8]"
                match="valueMissing"
              >
                Please enter a wallet address
              </Form.Message>
            </div>

            <Form.Control asChild>
              <input
                className="w-full py-3 px-3 ring-1 ring-slate-900/10 text-slate-500 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300 focus:border-blue-500 dark:bg-slate-800 dark:ring-0 dark:highlight-white/5 dark:text-slate-400 dark:focus:ring dark:focus:ring-blue-300"
                required
                value={artistAccountAddress}
                onChange={(e) => setArtistAccountAddress(e.target.value)}
              />
            </Form.Control>
          </Form.Field>

          <Form.Field className="flex flex-col gap-2" name="description">
            <div className="flex justify-between items-center">
              <Form.Label className="text-white text-base font-medium leading-5 tracking-normal text-left">
                Description
              </Form.Label>
              <Form.Message
                className="text-[13px] text-white opacity-[0.8]"
                match="valueMissing"
              >
                Please enter a description
              </Form.Message>
            </div>

            <Form.Control asChild>
              <textarea
                className="w-full py-3 px-3 ring-1 ring-slate-900/10 text-slate-500 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300 focus:border-blue-500 dark:bg-slate-800 dark:ring-0 dark:highlight-white/5 dark:text-slate-400 dark:focus:ring dark:focus:ring-blue-300"
                rows={8}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Control>
          </Form.Field>

          <Form.Field className="flex flex-col gap-2" name="upload">
            <div className="flex justify-between items-center">
              <p>Upload Cover</p>
              <p
                className={`text-[13px] opacity-[0.8] ${
                  uploadStatuses["cover"]?.percentage === 100
                    ? "text-green-500"
                    : "text-white"
                }`}
              >
                {uploadStatuses["cover"]?.percentage}
                {uploadStatuses["cover"]?.percentage && "%"}
              </p>
            </div>

            <Form.Control asChild>
              <UploadButton
                type={uploadButtonEnum.UPLOAD_COVER}
                uploadFile={uploadFile}
              />
            </Form.Control>
          </Form.Field>

          <Form.Field className="flex flex-col gap-2" name="upload">
            <div className="flex justify-between items-center">
              <p>Upload Song</p>
              <p
                className={`text-[13px] opacity-[0.8] ${
                  uploadStatuses["song"]?.percentage === 100
                    ? "text-green-500"
                    : "text-white"
                }`}
              >
                {uploadStatuses["song"]?.percentage}
                {uploadStatuses["song"]?.percentage && "%"}
              </p>
            </div>

            <Form.Control asChild>
              <UploadButton
                type={uploadButtonEnum.UPLOAD_SONG}
                uploadFile={uploadFile}
              />
            </Form.Control>
          </Form.Field>

          <Form.Submit asChild>
            <button className="py-4 box-border w-full inline-flex items-center justify-center rounded-lg font-medium bg-primary-200 text-white">
              Upload
            </button>
          </Form.Submit>
        </Form.Root>
      </div>
    </>
  );
}
