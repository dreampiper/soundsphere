import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";
import * as Select from "@radix-ui/react-select";
import classnames from "classnames";
import React, { Dispatch, SetStateAction } from "react";

export default function StorageProviders({
  setProvider,
}: {
  setProvider: Dispatch<SetStateAction<string>>;
}) {
  return (
    <Select.Root onValueChange={setProvider} name="select" required>
      <Select.Trigger
        className="inline-flex items-center justify-between rounded-lg px-5 py-4 gap-4 leading-none bg-white text-grey-300 data-[placeholder]:text-grey-300 ring-1 ring-slate-900/10 shadow-sm focus:outline-none focus:ring focus:ring-blue-300 focus:border-blue-500"
        aria-label="Storage providers"
      >
        <Select.Value placeholder="Select a storage provider" />
        <Select.Icon>
          <ChevronDownIcon className="text-grey-400 w-6 h-fit" />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content className="overflow-hidden bg-white rounded-md shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]">
          <Select.ScrollUpButton className="flex items-center justify-center h-[25px] bg-white text-grey-300 cursor-default">
            <ChevronUpIcon />
          </Select.ScrollUpButton>
          <Select.Viewport className="p-[5px]">
            <Select.Group>
              <Select.Label className="px-[25px] text-xs leading-[25px] text-grey-400">
                Storage Providers
              </Select.Label>
              <SelectItem value="lighthouse">Lighthouse</SelectItem>
              <SelectItem value="spheron">Spheron</SelectItem>
            </Select.Group>
          </Select.Viewport>
          <Select.ScrollDownButton className="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default">
            <ChevronDownIcon />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}

const SelectItem = React.forwardRef(
  (
    {
      children,
      className,
      value,
      disabled,
    }: { children: any; className?: any; value: string; disabled?: boolean },
    forwardedRef
  ) => {
    return (
      <Select.Item
        className={classnames(
          "text-[13px] leading-none text-grey-200 rounded-[3px] flex items-center h-[25px] pr-[35px] pl-[25px] relative select-none data-[disabled]:text-grey-100 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-primary-100 data-[highlighted]:text-white",
          className
        )}
        value={value}
        disabled={disabled}
        ref={forwardedRef as React.Ref<HTMLDivElement> | undefined}
      >
        <Select.ItemText>{children}</Select.ItemText>
        <Select.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
          <CheckIcon />
        </Select.ItemIndicator>
      </Select.Item>
    );
  }
);
