"use client";
import * as Form from "@radix-ui/react-form";

import ProfileNav from "@/components/ProfileNav";
import StorageProviders from "@/components/StorageProviders";
import UploadButton from "@/components/UploadButton";
import { uploadButtonEnum } from "@/data/constants";

export default function CreateDAO() {
  return (
    <>
      <ProfileNav>
        <h1 className="text-text-secondary text-2xl font-bold leading-[29px] tracking-normal text-left">New Music DAO</h1>
      </ProfileNav>

      <div className="w-full">
        <Form.Root className="flex flex-col gap-8 max-w-[460px] w-full">
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
              />
            </Form.Control>
          </Form.Field>

          <Form.Field className="flex flex-col gap-2" name="upload">
            <Form.Label className="text-white text-base font-medium leading-5 tracking-normal text-left">
              Upload Cover
            </Form.Label>

            <Form.Control asChild>
              <UploadButton type={uploadButtonEnum.UPLOAD_COVER} />
            </Form.Control>
          </Form.Field>

          <Form.Field className="flex flex-col gap-2" name="provider">
            <Form.Label className="text-white text-base font-medium leading-5 tracking-normal text-left">
              Storage Provider
            </Form.Label>
            <Form.Control asChild>
              <StorageProviders />
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
