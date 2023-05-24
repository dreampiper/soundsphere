"use client";
import * as Form from "@radix-ui/react-form";
import { FormEvent, useState } from "react";

import ProfileNav from "@/components/ProfileNav";
import StorageProviders from "@/components/StorageProviders";
import UploadButton from "@/components/UploadButton";
import { uploadButtonEnum } from "@/data/constants";
import useLightHouse from "@/hooks/lighthouse";
import { usePolybase } from "@/hooks/polybase";

export default function CreateDAO() {
  const { uploadFile, uploadStatuses } = useLightHouse();
  const { createCommunity } = usePolybase();

  const [name, setName] = useState("");
  const [daoAccountAddress, setDaoAccountAddress] = useState("");
  const [description, setDescription] = useState("");
  const [storageProvider, setStorageProvider] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();

    await createCommunity({
      name,
      description,
      daoAccountAddress,
      coverImage: uploadStatuses["cover"]?.fileStatus?.data.Hash || "",
      storageProvider,
    });

    alert("DAO created successfully");
    // toastRef.current && toastRef.current.callToast();
  }

  return (
    <>
      <ProfileNav>
        <h1 className="text-text-secondary text-2xl font-bold leading-[29px] tracking-normal text-left">
          New Music DAO
        </h1>
      </ProfileNav>

      <div className="w-full">
        <Form.Root
          onSubmit={handleSubmit}
          className="flex flex-col gap-8 max-w-[460px] w-full"
        >
          <Form.Field className="flex flex-col gap-2" name="name">
            <div className="flex justify-between items-center">
              <Form.Label className="text-white text-base font-medium leading-5 tracking-normal text-left">
                DAO Name
              </Form.Label>
              <Form.Message
                className="text-[13px] text-white opacity-[0.8]"
                match="valueMissing"
              >
                Please enter your DAO name
              </Form.Message>
            </div>

            <Form.Control asChild>
              <input
                className="w-full py-3 px-3 ring-1 ring-slate-900/10 text-slate-500 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300 focus:border-blue-500 dark:bg-slate-800 dark:ring-0 dark:highlight-white/5 dark:text-slate-400 dark:focus:ring dark:focus:ring-blue-300"
                required
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </Form.Control>
          </Form.Field>

          <Form.Field className="flex flex-col gap-2" name="name">
            <div className="flex justify-between items-center">
              <Form.Label className="text-white text-base font-medium leading-5 tracking-normal text-left">
                DAO Account Address
              </Form.Label>
              <Form.Message
                className="text-[13px] text-white opacity-[0.8]"
                match="valueMissing"
              >
                Please enter your DAO account address
              </Form.Message>
            </div>

            <Form.Control asChild>
              <input
                className="w-full py-3 px-3 ring-1 ring-slate-900/10 text-slate-500 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300 focus:border-blue-500 dark:bg-slate-800 dark:ring-0 dark:highlight-white/5 dark:text-slate-400 dark:focus:ring dark:focus:ring-blue-300"
                required
                onChange={(e) => setDaoAccountAddress(e.target.value)}
                value={daoAccountAddress}
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
                Please enter your DAO description
              </Form.Message>
            </div>

            <Form.Control asChild>
              <textarea
                className="w-full py-3 px-3 ring-1 ring-slate-900/10 text-slate-500 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300 focus:border-blue-500 dark:bg-slate-800 dark:ring-0 dark:highlight-white/5 dark:text-slate-400 dark:focus:ring dark:focus:ring-blue-300"
                rows={8}
                required
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />
            </Form.Control>
          </Form.Field>

          <Form.Field className="flex flex-col gap-2" name="upload">
            <Form.Label className="text-white text-base font-medium leading-5 tracking-normal text-left">
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
            </Form.Label>

            <Form.Control asChild>
              <UploadButton
                uploadFile={uploadFile}
                type={uploadButtonEnum.UPLOAD_COVER}
              />
            </Form.Control>
          </Form.Field>

          <Form.Field className="flex flex-col gap-2" name="provider">
            <Form.Label className="text-white text-base font-medium leading-5 tracking-normal text-left">
              Storage Provider
            </Form.Label>
            <Form.Control asChild>
              <StorageProviders setProvider={setStorageProvider} />
            </Form.Control>
          </Form.Field>

          <Form.Submit asChild>
            <button className="py-4 box-border w-full inline-flex items-center justify-center rounded-lg font-medium bg-primary-200 text-white">
              Create
            </button>
          </Form.Submit>
        </Form.Root>
      </div>
    </>
  );
}
