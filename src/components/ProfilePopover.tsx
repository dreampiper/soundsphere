"use client";
import * as Avatar from "@radix-ui/react-avatar";

export default function ProfilePopover() {
  return (
    <Avatar.Root className="bg-blackA3 inline-flex -ml-4 h-[50px] w-[50px] select-none items-center justify-center overflow-hidden rounded-full align-middle">
      <Avatar.Image
        className="h-full w-full rounded-[inherit] object-cover"
        src="https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&w=128&h=128&dpr=2&q=80"
        alt="Pedro Duarte"
      />
      <Avatar.Fallback
        className="text-violet11 leading-1 flex h-full w-full items-center justify-center bg-white text-[15px] font-medium"
        delayMs={600}
      >
        JD
      </Avatar.Fallback>
    </Avatar.Root>
  );
}
