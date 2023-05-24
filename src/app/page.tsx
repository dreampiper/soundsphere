"use client";
import { Community, Song, usePolybase } from "@/hooks/polybase";
import { useEffect, useState } from "react";

import DaoCard from "@/components/DaoCard";
import MusicPlayer from "@/components/MusicPlayer";
import ProfileNav from "@/components/ProfileNav";
import SearchBar from "@/components/SearchBar";
import getRandomItemsFromArray from "@/utils/getRandomItemsFromArray";

export default function Home() {
  const { getCommunities, getSongs, getCommunitiesId, getSongsId } =
    usePolybase();

  const [communities, setCommunities] = useState<Community[]>([]);
  const [songs, setSongs] = useState<Song[]>([]);

  useEffect(() => {
    (async () => {
      const communities = await getCommunities(getCommunitiesId || []);
      const songs = await getSongs(getSongsId || []);
      setCommunities(communities);
      setSongs(songs);
    })();
  }, [getCommunitiesId]);

  const randomDAORecommendation = getRandomItemsFromArray(communities, 5);
  const randomSongRecommendation = getRandomItemsFromArray(songs, 10);

  return (
    <>
      <ProfileNav>
        <SearchBar />
      </ProfileNav>

      <div className="flex gap-4 flex-col w-full">
        <h2 className={`text-2xl text-text-secondary font-semibold`}>
          Recommended
        </h2>

        <div className="mb-32 grid gap-4 text-center lg:mb-0 lg:grid-cols-4 lg:text-left">
          {randomDAORecommendation.map((community: Community) => (
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

      <div className="flex gap-4 flex-col w-full">
        <h2 className={`text-2xl text-text-secondary font-semibold`}>
          Featured songs
        </h2>

        <div className="flex flex-col gap-4">
          {randomSongRecommendation.map((song: Song) => (
            <MusicPlayer
              key={song.id}
              id={song.id}
              name={song.name}
              artist={song.artist}
              coverImage={`https://gateway.lighthouse.storage/ipfs/${song.coverImage}`}
              songUrl={song.songUrl}
              fromDAO={song.fromDAO}
            />
          ))}
        </div>
      </div>
    </>
  );
}
