"use client";
import ConnectWallet from "./ConnectWallet";
import ProfilePopover from "./ProfilePopover";

export default function ProfileNav({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <div className="flex gap-4 relative justify-between items-center w-full before:absolute before:-z-[100] before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]">
      <div className="w-full">{children}</div>

      <ConnectWallet />

      {/* <ProfilePopover /> */}
    </div>
  );
}
