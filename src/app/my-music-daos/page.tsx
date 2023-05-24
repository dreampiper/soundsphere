"use client";
import * as Tabs from "@radix-ui/react-tabs";

import DaoCard from "@/components/DaoCard";
import ProfileNav from "@/components/ProfileNav";
import SearchBar from "@/components/SearchBar";
import { Community, usePolybase } from "@/hooks/polybase";
import { store } from "@/store/store";
import { useEffect, useState } from "react";

export default function MyMusicDAOs() {
  const { getCommunities, getCommunitiesId, getUserRecord } = usePolybase();

  const userId = store.getState().userId;

  const [createdCommunities, setCreatedCommunities] = useState<Community[]>([]);
  const [joinedCommunities, setJoinedCommunities] = useState<Community[]>([]);

  useEffect(() => {
    if (!userId) return;
    (async () => {
      const user = await getUserRecord(userId);
      const createdCommunities = await getCommunities(
        user.createdCommunitiesId || []
      );
      const joinedCommunities = await getCommunities(
        user.joinedCommunitiesId || []
      );
      setCreatedCommunities(createdCommunities);
      setJoinedCommunities(joinedCommunities);
    })();
  }, [getCommunitiesId, userId]);

  return (
    <>
      <ProfileNav>
        <SearchBar />
      </ProfileNav>

      <div className="flex gap-4 flex-col w-full">
        <Tabs.Root className="flex flex-col w-full" defaultValue="tab1">
          <Tabs.List
            className="flex mb-4"
            aria-label="View DAOs you've created or joined"
          >
            <Tabs.Trigger
              className="px-5 h-[45px] flex items-center justify-center text-[15px] leading-none select-none first:rounded-tl-md last:rounded-tr-md hover:text-text-secondary data-[state=active]:text-text-secondary data-[state=active]:focus:relative data-[state=active]:focus:ring data-[state=active]:focus:ring-blue-300 data-[state=active]:focus:border-blue-500 outline-none cursor-default data-[state=active]:shadow-[inset_0_0_0_0,0_2px_0_0]"
              value="tab1"
            >
              Created
            </Tabs.Trigger>
            <Tabs.Trigger
              className="px-5 h-[45px] flex items-center justify-center text-[15px] leading-none select-none first:rounded-tl-md last:rounded-tr-md hover:text-text-secondary data-[state=active]:text-text-secondary data-[state=active]:focus:relative data-[state=active]:focus:ring data-[state=active]:focus:ring-blue-300 data-[state=active]:focus:border-blue-500 outline-none cursor-default data-[state=active]:shadow-[inset_0_0_0_0,0_2px_0_0]"
              value="tab2"
            >
              Joined
            </Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content className="grow rounded-b-md outline-none" value="tab1">
            <p className="mb-5 text-mauve11 text-[15px] leading-normal">
              All the music DAOs you've created will appear here.
            </p>
            <div className="mb-32 grid gap-4 text-center lg:mb-0 lg:grid-cols-4 lg:text-left">
              {createdCommunities.map((community: Community) => (
                <DaoCard
                  key={community.id}
                  id={community.id}
                  name={community.name}
                  description={community.description}
                  coverImage={`https://gateway.lighthouse.storage/ipfs/${community.coverImage}`}
                  members={2} // TODO: get members from the DAO
                />
              ))}
            </div>
          </Tabs.Content>

          <Tabs.Content className="grow rounded-b-md outline-none" value="tab2">
            <p className="mb-5 text-mauve11 text-[15px] leading-normal">
              Any music DAOs you've joined will appears here.
            </p>
            <div className="mb-32 grid gap-4 text-center lg:mb-0 lg:grid-cols-4 lg:text-left">
              {joinedCommunities.map((community: Community) => (
                <DaoCard
                  key={community.id}
                  id={community.id}
                  name={community.name}
                  description={community.description}
                  coverImage={`https://gateway.lighthouse.storage/ipfs/${community.coverImage}`}
                  members={2} // TODO: get members from the DAO
                />
              ))}
            </div>
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </>
  );
}
