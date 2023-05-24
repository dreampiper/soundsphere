"use client";
import { Song, usePolybase } from "@/hooks/polybase";
import Image from "next/image";
import { usePathname } from "next/navigation";

import MembersAvatars from "@/components/MemberAvatars";
import MusicPlayer from "@/components/MusicPlayer";
import ProfileNav from "@/components/ProfileNav";
import UploadMusicLinkButton from "@/components/UploadSongLink";
import { useEffect, useState } from "react";

export default function MusicDAO() {
  const pathname = usePathname();
  const {
    setActiveCommunityId,
    getCommunity: community,
    getSongs,
  } = usePolybase();

  const [communityId, setCommunityId] = useState<string | null>(null);
  const [songs, setSongs] = useState<Song[]>([]);

  useEffect(() => {
    const cleanPath = pathname.split("#")[0].split("?")[0];
    const segments = cleanPath.split("/");
    const communityId = segments[segments.length - 1];
    setCommunityId(communityId);
  }, [pathname]);

  useEffect(() => {
    if (!communityId) return;
    setActiveCommunityId(communityId);
  }, [communityId]);

  useEffect(() => {
    if (!community) return;
    (async () => {
      const songs = await getSongs(community.songsId || []);
      setSongs(songs);
    })();
  }, [community]);

  if (!community) {
    return <div>loading...</div>;
  }

  const { id, name, coverImage, description, songsId } = community;
  const members = 2; // FIXME: get from API

  return (
    <>
      <ProfileNav>
        <h1 className="text-text-secondary text-2xl font-bold leading-[29px] tracking-normal text-left">
          {name}
        </h1>
      </ProfileNav>

      <div className="flex flex-col gap-4 w-full">
        <div className="min-h-[208px] w-full relative">
          <Image
            className="rounded"
            src={`https://gateway.lighthouse.storage/ipfs/${coverImage}`}
            alt={`${name} Logo`}
            fill={true}
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="flex justify-between">
          <p className="w-[30ch] whitespace-nowrap overflow-hidden text-ellipsis">
            {description}
          </p>

          <div className="flex gap-2 items-center">
            <MembersAvatars />
            <p className="text-text-secondary text-base font-semibold leading-5 tracking-normal text-left">
              {members}
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-8 w-full">
        <button className="relative flex gap-2 justify-center items-center w-max bg-grey-200 text-white p-4 px-5 rounded-[90px]">
          <p className="whitespace-nowrap text-lg font-medium leading-[22px] tracking-normal text-left">
            Chat room
          </p>
        </button>

        <UploadMusicLinkButton id={id} />
      </div>

      <div className="flex gap-4 flex-col w-full">
        <h2 className={`text-2xl text-text-secondary font-semibold`}>
          Featured songs
        </h2>

        <div className="flex flex-col gap-4">
          {songs.map((song: Song) => (
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
