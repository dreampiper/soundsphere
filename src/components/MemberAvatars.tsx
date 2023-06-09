"use client";
import * as Avatar from "@radix-ui/react-avatar";

export default function MemberAvatars() {
  return (
    <div className="flex gap-[-10rem]">
      <Avatar.Root className="bg-blackA3 inline-flex -ml-4 h-[40px] w-[40px] select-none items-center justify-center overflow-hidden rounded-full align-middle">
        <Avatar.Image
          className="h-full w-full rounded-[inherit] object-cover"
          src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
          alt="Colm Tuite"
        />
        <Avatar.Fallback
          className="text-violet11 leading-1 flex h-full w-full items-center justify-center bg-white text-[15px] font-medium"
          delayMs={600}
        >
          CT
        </Avatar.Fallback>
      </Avatar.Root>
      <Avatar.Root className="bg-blackA3 inline-flex -ml-4 h-[40px] w-[40px] select-none items-center justify-center overflow-hidden rounded-full align-middle">
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
      <Avatar.Root className="bg-blackA3 inline-flex -ml-4 h-[40px] w-[40px] select-none items-center justify-center overflow-hidden rounded-full align-middle">
        <Avatar.Fallback className="text-text-primary leading-1 flex h-full w-full items-center justify-center bg-white text-[15px] font-medium">
          PD
        </Avatar.Fallback>
      </Avatar.Root>
    </div>
  );
}
