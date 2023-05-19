"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import { NavData, navData } from "@/data/constants";

export default function Nav() {
  const [activeNav, setActiveNav] = useState(0);

  const navIconComponents = useMemo(
    () =>
      navData.map((data, index) => {
        const active = index === activeNav;
        if (index === 3) {
          return (
            <>
              <CreateDAOButton key="create-dao-button" />
              <NavButton
                key={data.title}
                active={active}
                setActiveNav={setActiveNav}
                navButtonData={data}
                index={index}
              />
            </>
          );
        }
        return (
          <NavButton
            key={data.title}
            active={active}
            setActiveNav={setActiveNav}
            navButtonData={data}
            index={index}
          />
        );
      }),
    [activeNav]
  );

  return (
    <div className="flex flex-col gap-8 p-8 bg-nav h-screen w-fit">
      <Image
        key={"soundsphere-logo"}
        className="mb-4"
        src="/sound-sphere.svg"
        alt="SoundSphere Logo"
        width={176.70620727539062}
        height={23.212799072265625}
        priority
      />
      {navIconComponents}
    </div>
  );
}

function NavButton({
  active,
  setActiveNav,
  navButtonData,
  index,
}: {
  active: boolean;
  setActiveNav: (index: number) => void;
  navButtonData: NavData;
  index: number;
}) {
  const router = useRouter();

  const handleClick = () => {
    setActiveNav(index);
    router.push(navButtonData.href);
  };

  return (
    <button
      onClick={handleClick}
      className="flex gap-2 w-max whitespace-nowrap items-center"
    >
      <Image
        src={active ? navButtonData.src.light : navButtonData.src.dark}
        alt="nav icon"
        width={18}
        height={18}
        priority
      />
      <p className={active ? "text-white text-base font-semibold leading-5 tracking-normal text-left" : "text-base font-semibold leading-5 tracking-normal text-left"}>{navButtonData.title}</p>
    </button>
  );
}

function CreateDAOButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/create-dao")}
      className="flex gap-2 justify-center items-center w-max bg-primary-300 text-white p-4 px-5 rounded-[90px]"
    >
      <p className="whitespace-nowrap text-lg font-medium leading-[22px] tracking-normal text-left">Create DAO</p>
      <Image src="/plus.svg" alt="plus" width={18} height={18} priority />
    </button>
  );
}
