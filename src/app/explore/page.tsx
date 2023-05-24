"use client";
import DaoCard from "@/components/DaoCard";
import ProfileNav from "@/components/ProfileNav";
import SearchBar from "@/components/SearchBar";
import { Community, usePolybase } from "@/hooks/polybase";
import { useEffect, useState } from "react";

export default function Explore() {
  const { getCommunities, getCommunitiesId } = usePolybase();

  const [communities, setCommunities] = useState<Community[]>([]);

  useEffect(() => {
    (async () => {
      const communities = await getCommunities(getCommunitiesId || []);
      setCommunities(communities);
    })();
  }, [getCommunitiesId]);

  return (
    <>
      <ProfileNav>
        <SearchBar />
      </ProfileNav>

      <div className="flex gap-4 flex-col w-full h-full">
        {!communities.length && (
          <div className="flex justify-center items-center w-full h-full">
            loading...
          </div>
        )}
        <div className="mb-32 grid gap-4 text-center lg:mb-0 lg:grid-cols-4 lg:text-left">
          {communities.map((community: Community) => (
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
      </div>
    </>
  );
}
