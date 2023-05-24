"use client";
import Image from "next/image";
import React, { useState, useRef } from "react";

export default function MusicPlayer({
  id,
  inDAO,
  name,
  artist,
  coverImage,
  songUrl,
  fromDAO,
}: {
  id: string;
  inDAO?: boolean;
  name: string;
  artist: string;
  coverImage: string;
  songUrl: string;
  fromDAO: string;
}) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="flex justify-between">
      <div className="flex gap-8 justify-center items-center ">
        <div className="h-[100px] w-[100px] relative">
          <Image
            className="rounded"
            src={coverImage}
            alt={`${name} Logo`}
            fill={true}
            style={{ objectFit: "cover" }}
          />
        </div>

        <div className="flex flex-col gap-1 text-text-secondary">
          <h3 className="text-lg font-normal leading-[22px] tracking-normal text-left;">
            {artist}
          </h3>
          <p className="text-lg font-bold leading-[22px] tracking-normal text-left">
            {name}
          </p>
          <p
            className="text-xs font-normal leading-[15px] tracking-normal text-left"
            style={{ display: inDAO ? "none" : "block" }}
          >
            <span className="text-xs font-semibold leading-[15px] tracking-normal text-left">
              from:
            </span>{" "}
            {fromDAO}
          </p>
        </div>
      </div>

      <button onClick={togglePlay}>{isPlaying ? "Pause" : "Play"}</button>
      <audio
        ref={audioRef}
        src={`https://gateway.lighthouse.storage/ipfs/${songUrl}`}
      />

      <Image
        onClick={togglePlay}
        src="/play.svg"
        alt="play icon"
        width={48}
        height={48}
        priority
      />
    </div>
  );
}
